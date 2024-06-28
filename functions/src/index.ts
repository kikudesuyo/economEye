import { region } from "firebase-functions";
import { CallableRequest } from "firebase-functions/v2/https";

import "module-alias/register";

import { updateAllItems } from "@/helper/updateAllItem";
import { registerItem } from "@/helper/registerNewItem";

// 新規商品登録
exports.registerNewItem = region("asia-northeast1").https.onCall(
  async (request: CallableRequest) => {
    return await registerItem(request);
  }
);

// 商品情報の更新
exports.runScheduledJobs = region("asia-northeast1")
  .pubsub.schedule("every day 00:00")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    await updateAllItems();
  });
