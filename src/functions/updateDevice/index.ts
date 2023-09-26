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
        // OpenAPI (Swagger) docs related
        summary: "Update an existing device from inventory",
        produces: ["application/json"],
        consumes: ["application/json"],
        swaggerTags: ["Device"],
        bodyType: "Device",
        responseData: {
          200: {
            bodyType: "Device"
          },
          400: "Invalid payload",
          404: "Device not found",
          500: "Internal server error. Please try again later"
        }
      },
    },
  ],
};
