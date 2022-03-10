import defaultSettings from "@functions/defaultsettings";
import { handlerPath } from "@libs/handlerresolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  layers: [{ Ref: "NodejsLambdaLayer" }],
  name: "updateDevice",
  events: [
    {
      http: {
        method: "put",
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
