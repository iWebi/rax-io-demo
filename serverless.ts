import type { AWS } from "@serverless/typescript";
import functions from "./functions";
import iamRoleStatements from "./iamRoleStatements";
import offlineresources from "./offlineresources";
import plugins from "./plugins";
import resources from "./resources";

const serverlessConfiguration: AWS = {
  service: "rax-io-demo",
  frameworkVersion: "3",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: false,
    },
    prune: {
      automatic: true,
      number: 3,
    },
    ...offlineresources,
  },
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
      description: "Rax-IO Demo Rest API for Device Data CRUD using DynamoDB",
    },
    logRetentionInDays: 14,
    logs: {
      restApi: true,
    },
    environment: {
      NOTIFICATION_QUEUE_URL: {
        Ref: "DeviceNotificationQueue",
      },
      NODE_PATH: "/opt/node_modules",
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    iamRoleStatements,
    tracing: {
      lambda: true,
      apiGateway: true,
    },
  },
  package: {
    individually: true,
    excludeDevDependencies: false,
  },
  layers: {
    nodejs: {
      name: "nodejs",
      path: "layer",
      description: "API NodeJS dependencies with aws-sdk v3",
      compatibleRuntimes: ["nodejs14.x"],
    },
  },
  plugins,
  resources,
  functions,
};

module.exports = serverlessConfiguration;
