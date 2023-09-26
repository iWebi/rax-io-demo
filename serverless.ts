import type { AWS } from "@serverless/typescript";
import functions from "./functions";
import iamRoleStatements from "./iamRoleStatements";
import offlineresources from "./offlineresources";
import plugins from "./plugins";
import resources from "./resources";

const serverlessConfiguration: AWS = {
  service: "rax-io-demo",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs18.x",
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
  },
  layers: {
    nodejs: {
      name: "nodejs",
      path: "layer",
      description: "API NodeJS dependencies with aws-sdk v3",
      compatibleRuntimes: ["nodejs18.x"],
    },
  },
  plugins,
  resources,
  functions,
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: false,
    },
    prune: {
      automatic: true,
      number: 3,
    },
    autoswagger: {
      title: "rax-io-demo.api.com",
      basePath: "/dev",
      generateSwaggerOnDeploy: true,
      apiKeyHeaders: [ "Authorization"],
      typefiles: ["./src/libs/types.ts"],
      apiType: "http",
      schemes: ["https", "http"]
    },
    ...offlineresources,
  },
};

module.exports = serverlessConfiguration;
