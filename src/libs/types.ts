export interface BaseEntity {
  hashKey: string;
  rangeKey?: string;
  created: string;
  updated: string;
}

export interface Device extends BaseEntity {
  tenantId: string;
  id: string;
  name: string;
  ip: string;
}
export interface StringMap {
  [s: string]: string;
}

export interface StringToListMap {
  [s: string]: string[];
}

export interface LambdaRequestContext {
  resourceId: string;
  resourcePath: string;
  httpMethod: string;
  extendedRequestId: string;
  requestTime: string;
  path: string;
  accountId: string;
  apiId: string;
  protocol: string;
  stage: string;
  domainPrefix: string;
  requestTimeEpoch: number;
  requestId: string;
  identity: StringMap;
  domainName: string;
  appId: string;
}

export interface LambdaEvent {
  type: string;
  methodArn: string;
  resource: string;
  path: string;
  httpMethod: string;
  body?: string;
  isBase64Encoded?: boolean;
  headers: StringMap;
  multiValueHeaders: StringToListMap;
  queryStringParameters: StringMap;
  multiValueQueryStringParameters: StringToListMap;
  pathParameters: StringMap;
  stageVariables: StringMap;
  requestContext: LambdaRequestContext;
}

// alternately one could use types from @types/aws-lambda from DefinetlyTyped
export interface LambdaProxyHeader {
  [key: string]: string;
}

export interface LambdaProxyResponseBase {
  headers: LambdaProxyHeader;
  isBase64Encoded?: boolean;
  statusCode: number;
}

export interface LambdaProxyResponse extends LambdaProxyResponseBase {
  body: string;
  Count?: number;
}

export interface GenericResponse<T> extends LambdaProxyResponseBase {
  body: T;
  statusCode: number;
  statusType: string;
}

export interface AppError {
  body: string;
  statusCode: number;
  statusType: string;
}

export interface DynamoDBMap {
  [s: string]: { [S: string]: any };
}

export interface DynamoItemResponse<T> {
  body: T;
  statusCode: number;
  statusType: string;
}

export interface DynamoItemKey {
  [key: string]: any;
}

export interface DynamoDBQueryResponse<T> extends DynamoItemResponse<T> {
  LastEvaluatedKey?: DynamoItemKey;
  Count?: number;
}
