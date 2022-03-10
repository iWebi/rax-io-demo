import { updateDevice } from "@libs/device";

exports.handler = async (event) => {
  const pathParameters = event.pathParameters;
  return await updateDevice(event.body, pathParameters.deviceId, pathParameters.tenant);
};
