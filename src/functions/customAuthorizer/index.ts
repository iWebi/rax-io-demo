import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  layers: [{ Ref: "NodejsLambdaLayer" }],
  name: "customAuthorizer",
};
