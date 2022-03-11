import * as repository from "./devicerepository";
import { sendNewDeviceMessage } from "./sqs";
import { Device, LambdaProxyResponse } from "./types";
import { badRequestWith, errorProxyResponse, isNonEmpty, successProxyResponse } from "./utils";

export async function addDevice(deviceRequest: string, tenant: string): Promise<LambdaProxyResponse> {
  try {
    const device = validateDeviceForCreateOrUpdate(deviceRequest);
    device.tenantId = tenant;
    await repository.addDevice(device);
    await sendNewDeviceMessage(device);
    return successProxyResponse(device, 200);
  } catch (err) {
    return errorProxyResponse(err);
  }
}

function validateDeviceForCreateOrUpdate(deviceRequest: string): Device {
  let device: Device;
  try {
    device = JSON.parse(deviceRequest);
  } catch (err) {
    throw badRequestWith("Invalid JSON payload");
  }
  // Example validations
  if (isNonEmpty(device.name) && isNonEmpty(device.ip)) {
    return device;
  }
  throw badRequestWith("Missing mandatory fields: name, ip for device creation");
}

export async function getDevice(deviceId: string, tenant: string): Promise<LambdaProxyResponse> {
  try {
    const deviceResponse = await repository.getDevice(deviceId, tenant);
    return successProxyResponse(deviceResponse.body, 200);
  } catch (err) {
    return errorProxyResponse(err);
  }
}

export async function deleteDevice(deviceId: string, tenant: string): Promise<LambdaProxyResponse> {
  try {
    const deleteResponse = await repository.deleteDevice(deviceId, tenant);
    return successProxyResponse(deleteResponse.body, 200);
  } catch (err) {
    return errorProxyResponse(err);
  }
}

export async function updateDevice(
  deviceRequest: string,
  deviceId: string,
  tenant: string
): Promise<LambdaProxyResponse> {
  try {
    const device = validateDeviceForCreateOrUpdate(deviceRequest);
    device.id = deviceId;
    device.tenantId = tenant;
    const updateResponse = await repository.updateDevice(device);
    return successProxyResponse(updateResponse.body);
  } catch (err) {
    return errorProxyResponse(err);
  }
}
