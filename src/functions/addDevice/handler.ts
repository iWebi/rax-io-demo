import { addDevice } from "@libs/device";
import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  const pathParameters = event.pathParameters;
  return await addDevice(event.body, pathParameters.tenant);
};
