import defaultSettings from "@functions/defaultsettings";
import { handlerPath } from "@libs/handlerresolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  layers: [{ Ref: "NodejsLambdaLayer" }],
  name: "addDevice",
  events: [
    {
      http: {
        method: "post",
        path: "v1.0/{tenant}/device",
        ...defaultSettings,
        request: {
          parameters: {
            paths: {
              tenant: true,
            },
          },
        },
        // OpenAPI (Swagger) docs related
        summary: "Add a new device to inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        swaggerTags: ["Device"],
        bodyType: "DeviceReq",
        responseData: {
          200: {
            bodyType: "Device"
          },
          400: "Invalid payload",
          500: "Internal server error. Please try again later"
        }
      },
    },
  ],
};
