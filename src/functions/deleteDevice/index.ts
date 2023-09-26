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
        // OpenAPI (Swagger) docs related
        summary: "Delete an existing device from inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        swaggerTags: ["Device"],
        responseData: {
          200: {
            bodyType: "Device"
          },
          404: "Device not found",
          500: "Internal server error. Please try again later"
        }
      },
    },
  ],
};
