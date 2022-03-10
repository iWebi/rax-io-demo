import defaultSettings from "@functions/defaultsettings";
import { handlerPath } from "@libs/handlerresolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  layers: [{ Ref: "NodejsLambdaLayer" }],
  name: "deleteDevice",
  events: [
    {
      http: {
        method: "delete",
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
