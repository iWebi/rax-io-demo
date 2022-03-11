import { Device } from "@libs/types";
import { SQSEvent } from "aws-lambda";

exports.handler = async (event: SQSEvent) => {
  const device: Device = JSON.parse(event.Records[0].body);
  console.log("Notification Device ", device);
};
