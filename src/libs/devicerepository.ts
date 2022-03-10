import { DeleteCommandInput, GetCommandInput, PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { ulid } from "ulid";
import { DEVICE_TABLE } from "./constants";
import { deleteItem, getItem, putItem } from "./dynamodb";
import { Device, DynamoItemResponse } from "./types";
import { okResponse } from "./utils";

export async function addDevice(device: Device): Promise<DynamoItemResponse<Device>> {
  device.id = ulid();
  device.hashKey = hashKeyFor(device);
  device.rangeKey = device.id;
  device.created = new Date().toISOString();
  device.updated = device.created;

  const params = {
    Item: device,
    TableName: DEVICE_TABLE,
  } as PutCommandInput;

  await putItem(params);
  return okResponse(params.Item! as Device);
}

function hashKeyFor(device: Device): string {
  return `${device.tenantId}-Devices`;
}

export async function getDevice(deviceId: string, tenant: string): Promise<DynamoItemResponse<Device>> {
  const params = {
    Key: {
      hashKey: `${tenant}-Devices`,
      rangeKey: deviceId,
    },
    TableName: DEVICE_TABLE,
  } as GetCommandInput;
  return await getItem(params);
}

export async function updateDevice(device: Device): Promise<DynamoItemResponse<Device>> {
  device.hashKey = hashKeyFor(device);
  device.rangeKey = device.id;
  device.updated = new Date().toISOString();

  const params = {
    Item: device,
    TableName: DEVICE_TABLE,
  } as PutCommandInput;

  await putItem(params);
  return okResponse(params.Item! as Device);
}

export async function deleteDevice(deviceId: string, tenant: string): Promise<DynamoItemResponse<Device>> {
  const params = {
    Key: {
      hashKey: `${tenant}-Devices`,
      rangeKey: deviceId,
    },
    TableName: DEVICE_TABLE,
    ReturnValues: "ALL_OLD",
  } as DeleteCommandInput;
  return await deleteItem(params);
}
