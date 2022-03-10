import { deleteDevice } from "@libs/device";

exports.handler = async (event) => {
  const pathParameters = event.pathParameters;
  return await deleteDevice(pathParameters.deviceId, pathParameters.tenant);
};
