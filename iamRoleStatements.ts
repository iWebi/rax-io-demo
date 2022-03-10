export default [
  {
    Effect: "Allow",
    Action: ["dynamodb:*"],
    Resource: ["arn:aws:dynamodb:*:*:table/Device*"],
  },
  {
    Effect: "Allow",
    Action: "sqs:*",
    Resource: [
      {
        "Fn::GetAtt": ["DeviceNotificationQueue", "Arn"],
      },
    ],
  },
];
