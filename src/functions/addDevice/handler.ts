import { addDevice } from "@libs/device";

exports.handler = async (event) => {
  const pathParameters = event.pathParameters;
  return await addDevice(event.body, pathParameters.tenant);
};
