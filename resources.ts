import * as dynamoResources from "./dynamodbresources";
import * as sqsResources from "./sqsresources";
export default {
  Resources: {
    ...dynamoResources.default,
    ...sqsResources.default,
  },
};
