import {
  onCall,
  HttpsError,
  CallableRequest,
} from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { logger } from "firebase-functions";

import { today } from "./utils/time";
import { ClientParams } from "./utils/type";
import { fetchItemData, setData } from "./helper/db";
import { updateAllItems } from "./helper/updateAllItem";

exports.registerNewItem = onCall(async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User is not authenticated.");
  }
  const uid = request.auth.uid;
  const data: ClientParams = request.data;
  const itemData = await fetchItemData(data);
  await setData(uid, itemData);
  logger.info(`${data.itemName} is successfully registered: on ${today()}.`);
  return { succuess: "success!" };
});

exports.runScheduledJobs = onSchedule(
  {
    schedule: "every day 00:00",
    timeZone: "Asia/Tokyo",
  },
  async () => {
    await updateAllItems();
  }
);
