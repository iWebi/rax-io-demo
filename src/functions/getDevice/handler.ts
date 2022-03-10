import { getDevice } from "@libs/device";

exports.handler = async (event) => {
  const pathParameters = event.pathParameters;
  return await getDevice(pathParameters.deviceId, pathParameters.tenant);
};
