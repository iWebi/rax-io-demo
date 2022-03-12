import { getDevice } from "@libs/device";
import { APIGatewayEvent } from "aws-lambda";

exports.handler = async (event: APIGatewayEvent) => {
  const pathParameters = event.pathParameters;
  return await getDevice(pathParameters.deviceId, pathParameters.tenant);
};
