import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";

import "module-alias/register";

import { updateAllItems } from "@/helper/updateAllItem";
import { registerItem } from "@/helper/registerNewItem";

// 新規商品登録
exports.registerNewItem = onCall(
  { region: "asia-northeast1" },
  async (request: CallableRequest) => {
    return await registerItem(request);
  }
);

// 商品情報の更新
exports.runScheduledJobs = onSchedule(
  {
    region: "asia-northeast1",
    timeZone: "Asia/Tokyo",
    schedule: "every day 00:00",
  },
  async () => {
    await updateAllItems();
  }
);
