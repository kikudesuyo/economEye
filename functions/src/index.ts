import { onCall, CallableRequest } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";

import "module-alias/register";

import { updateAllItems } from "@/helper/updateAllItem";
import { registeItem } from "@/helper/registerNewItem";

// 新規商品登録
exports.registerNewItem = onCall(async (request: CallableRequest) => {
  return await registeItem(request);
});

// 商品情報の更新
exports.runScheduledJobs = onSchedule(
  {
    schedule: "every day 00:00",
    timeZone: "Asia/Tokyo",
  },
  async () => {
    await updateAllItems();
  }
);
