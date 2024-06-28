import { CallableRequest, onCall } from "firebase-functions/v2/https";
import { onSchedule } from "firebase-functions/v2/scheduler";

import "module-alias/register";

import { updateAllItems } from "@/helper/updateAllItem";
import { registerItem } from "@/helper/registerNewItem";
import {
  FUNCTION_REGION,
  FUNCTION_TIMEZONE,
  ITEM_UPDATE_SCHEDULE,
} from "@/constant/region";

// 新規商品登録
exports.registerNewItem = onCall(
  { region: FUNCTION_REGION },
  async (request: CallableRequest) => {
    return await registerItem(request);
  }
);

// 商品情報の更新
exports.runScheduledJobs = onSchedule(
  {
    region: FUNCTION_REGION,
    timeZone: FUNCTION_TIMEZONE,
    schedule: ITEM_UPDATE_SCHEDULE,
  },
  async () => {
    await updateAllItems();
  }
);
