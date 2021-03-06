import { handlerPath } from "@libs/handlerresolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  layers: [{ Ref: "NodejsLambdaLayer" }],
  name: "deviceNotificationHandler",
  events: [
    {
      sqs: {
        arn: {
          "Fn::GetAtt": ["DeviceNotificationQueue", "Arn"],
        },
      },
    },
  ],
};
