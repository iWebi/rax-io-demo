import {
  AttributeValue,
  DeleteItemOutput,
  DynamoDBClient,
  QueryOutput,
  ScanOutput,
  UpdateItemOutput,
} from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import * as AWSXRay from "aws-xray-sdk";
import { debug } from "console";
import DefaultClientConfig from "./awsclientconfig";
import { DynamoDBQueryResponse, DynamoItemResponse } from "./types";
import { internalServerErrorWith, notFoundResponse, okResponse, setStatusType } from "./utils";

const ddbDocClient = buildDocClient();

export async function getItem(params: any): Promise<DynamoItemResponse<any>> {
  const data = await ddbDocClient.send(new GetCommand(params));
  if (!data.Item) {
    throw404(params);
  }
  return okResponse(data.Item!);
}

export async function getItems(params: any): Promise<DynamoDBQueryResponse<any>> {
  const response = await ddbDocClient.send(new QueryCommand(params));
  if (response.Count! === 0) {
    throw404(params);
  }
  return collectionResponse(response);
}

export async function putItem(params: any): Promise<DynamoItemResponse<any>> {
  try {
    await ddbDocClient.send(new PutCommand(params));
  } catch (err) {
    throw errorResponse(err);
  }
  return okResponse("");
}

export async function updateItem(params: any): Promise<DynamoItemResponse<any>> {
  let data: UpdateItemOutput = {};
  try {
    data = await ddbDocClient.send(new UpdateCommand(params));
  } catch (err) {
    throw errorResponse(err);
  }
  return okResponse([data.Attributes!]);
}

export async function deleteItem(params: any): Promise<DynamoItemResponse<any>> {
  let data: DeleteItemOutput = {};
  try {
    data = await ddbDocClient.send(new DeleteCommand(params));
  } catch (err) {
    throw errorResponse(err);
  }
  if (!data.Attributes) {
    throw404(params);
  }
  return okResponse(data.Attributes!);
}

function errorResponse(err: any) {
  if (err.hasOwnProperty("$metadata")) {
    const code = err.httpStatusCode;
    return {
      body: err.message,
      statusCode: code,
      statusType: setStatusType(code),
    };
  }
  return internalServerErrorWith(JSON.stringify(err));
}

function collectionResponse(data: ScanOutput | QueryOutput) {
  const output = data.Items;
  return {
    Count: output?.length,
    LastEvaluatedKey: data.LastEvaluatedKey,
    body: output,
    statusCode: 200,
    statusType: "OK",
  };
}

export function toDynamoString(value: string): AttributeValue {
  return { S: value ?? null };
}

export function toDynamoNumber(value: number) {
  return { N: value };
}

function throw404(params: any, message?: string) {
  debug("Item not found for params", params);
  throw notFoundResponse(message);
}

export function buildDocClient() {
  const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: true, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
  };

  const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
  };

  const { IS_OFFLINE } = process.env;
  const offlineOptions = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    // either .aws/credentials or ENV variables or config needs credentials keys.
    // These are checked by AWS SDK but not used in offline mode
    credentials: {
      accessKeyId: "required-but-not-used-weird",
      secretAccessKey: "required-but-not-used-weird",
    },
  };
  const dynamodb = IS_OFFLINE
    ? new DynamoDBClient(offlineOptions)
    : AWSXRay.captureAWSv3Client(new DynamoDBClient(DefaultClientConfig));
  return DynamoDBDocumentClient.from(dynamodb, { marshallOptions, unmarshallOptions });
}
