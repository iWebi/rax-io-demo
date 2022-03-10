export default {
  DeviceNotificationQueue: {
    Type: "AWS::SQS::Queue",
    Properties: {
      QueueName: "devicenotifications.fifo",
      FifoQueue: true,
      VisibilityTimeout: 60,
      MessageRetentionPeriod: 345600,
      ContentBasedDeduplication: true,
    },
  },
};
