import { authorize } from "@libs/auth";

exports.handler = async (event) => {
  return await authorize(event);
};
