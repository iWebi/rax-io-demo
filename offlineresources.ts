export default {
  dynamodb: {
    stages: ["dev"],
    start: {
      port: 8000,
      inMemory: true,
      migrate: true,
      seed: true,
      // If you are run DynamoDB in docker, you can enable noStart to prevent another instance of DynamoDB
      noStart: false,
    },
    migration: {
      dir: "offline/dynamodb/migrations",
    },
    seed: {
      dev: {
        sources: [
          {
            table: "Device",
            sources: ["./offline/dynamodb/devices_seed.json"],
          },
        ],
      },
    },
  },
  elasticmq: {
    stages: ["dev"],
    start: {
      port: 9324,
      noStart: false,
    },
  },
  "serverless-offline-sqs": {
    autoCreate: true,
    apiVersion: "2012-11-05",
    endpoint: "http://0.0.0.0:9324",
    region: "not-used-value",
    accessKeyId: "not-used-value",
    secretAccessKey: "not-used-value",
    skipCacheInvalidation: false,
  },
};
