import { CallableRequest, HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

import { setData, fetchItemData } from "@/helper/db";
import { ClientParams } from "@/utils/type";
import { today } from "@/utils/time";

export const registerItem = async (request: CallableRequest) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "User is not authenticated.");
  }
  const uid = request.auth.uid;
  const data: ClientParams = request.data;
  const itemData = await fetchItemData(data);
  await setData(uid, itemData);
  logger.info(`${data.itemName} is successfully registered: on ${today()}.`);
  return { success: "success!" };
};
