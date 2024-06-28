import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";

import "module-alias/register";

import { updateAllItems } from "@/helper/updateAllItem";
import { registerItem } from "@/helper/registerNewItem";
import {
  FUNCTIONS_REGION,
  FUNCTIONS_TIMEZONE,
  ITEM_UPDATE_SCHEDULE,
} from "@/constant/region";

// 新規商品登録
exports.registerNewItem = onCall(
  { region: FUNCTIONS_REGION },
  async (request: CallableRequest) => {
    return await registerItem(request);
  }
);

// 商品情報の更新
exports.runScheduledJobs = onSchedule(
  {
    region: FUNCTIONS_REGION,
    timeZone: FUNCTIONS_TIMEZONE,
    schedule: ITEM_UPDATE_SCHEDULE,
  },
  async () => {
    await updateAllItems();
  }
);
