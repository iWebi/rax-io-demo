import defaultSettings from "@functions/defaultsettings";
import { handlerPath } from "@libs/handlerresolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  layers: [{ Ref: "NodejsLambdaLayer" }],
  name: "getDevice",
  events: [
    {
      http: {
        method: "get",
        path: "v1.0/{tenant}/device/{deviceId}",
        ...defaultSettings,
        request: {
          parameters: {
            paths: {
              tenant: true,
              deviceId: true,
            },
          },
        },
      },
    },
  ],
};
