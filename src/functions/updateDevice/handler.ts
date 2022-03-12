import { updateDevice } from "@libs/device";
import { APIGatewayEvent } from "aws-lambda";

exports.handler = async (event: APIGatewayEvent) => {
  const pathParameters = event.pathParameters;
  return await updateDevice(event.body, pathParameters.deviceId, pathParameters.tenant);
};
