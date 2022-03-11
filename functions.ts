import addDevice from "@functions/addDevice";
import customAuthorizer from "@functions/customAuthorizer";
import deleteDevice from "@functions/deleteDevice";
import deviceNotificationProcessor from "@functions/deviceNotificationProcessor";
import getDevice from "@functions/getDevice";
import updateDevice from "@functions/updateDevice";

export default {
  addDevice,
  updateDevice,
  getDevice,
  deleteDevice,
  customAuthorizer,
  deviceNotificationProcessor,
};
