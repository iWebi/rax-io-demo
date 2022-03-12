import { SendMessageCommand, SendMessageCommandInput, SQSClient } from "@aws-sdk/client-sqs";
import * as AWSXRay from "aws-xray-sdk";
import { Device } from "./types";

const sqsClient = buildSQSClient();

function buildSQSClient() {
  const { IS_OFFLINE } = process.env;
  const offlineOptions = {
    region: "localhost",
    endpoint: "http://localhost:9324",
    // either .aws/credentials or ENV variables or config needs credentials keys.
    // These are checked by AWS SDK but not used in offline mode
    credentials: {
      accessKeyId: "required-but-not-used-weird",
      secretAccessKey: "required-but-not-used-weird",
    },
  };
  return IS_OFFLINE
    ? new SQSClient(offlineOptions)
    : AWSXRay.captureAWSv3Client(new SQSClient({ region: process.env.AWS_REGION }));
}

function getNotificationsQueueName(): string {
  const { IS_OFFLINE, NOTIFICATION_QUEUE_URL } = process.env;
  return IS_OFFLINE ? "http://localhost:9324/queue/devicenotifications.fifo" : NOTIFICATION_QUEUE_URL;
}

export async function sendNewDeviceMessage(device: Device) {
  const sendMessageInput = {
    QueueUrl: getNotificationsQueueName(),
    MessageBody: JSON.stringify(device),
    MessageGroupId: `Devices-${device.id}-${device.tenantId}`,
  } as SendMessageCommandInput;
  await sqsClient.send(new SendMessageCommand(sendMessageInput));
}
