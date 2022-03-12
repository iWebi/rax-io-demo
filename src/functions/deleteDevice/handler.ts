import { deleteDevice } from "@libs/device";
import { APIGatewayEvent } from "aws-lambda";

exports.handler = async (event: APIGatewayEvent) => {
  const pathParameters = event.pathParameters;
  return await deleteDevice(pathParameters.deviceId, pathParameters.tenant);
};
