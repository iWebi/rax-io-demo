// default client configuration for each AWS Client
// AWS SDF v3 does not offer a global config as in v2 (AWS.config)
// in v3, config needs to be passed to each client instance
// ref: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/global-config-object.html

import { AWS_REGION_DEFAULT } from "./constants";

export default {
  region: AWS_REGION_DEFAULT, // TODO: this should come from Environment variable
};
