import {
  onCall,
  HttpsError,
  CallableRequest,
} from "firebase-functions/v2/https";
import { today } from "./utils/time";
import { ClientParams, ItemData } from "./utils/type";
import { logger } from "firebase-functions";
import { fetchItemData, setData, updateItem, db } from "./helper/db";

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

exports.updateItem = onCall(async () => {
  const batch = db.batch();
  const itemRefs = db.collection("items").listDocuments();
  await Promise.all(
    (
      await itemRefs
    ).map(async (ref) => {
      const itemSnapshot = await ref.get();
      const itemData = itemSnapshot.data() as ItemData;
      const latestItem = await updateItem(itemData);
      batch.update(ref, latestItem);
    })
  );
  await batch.commit().catch(() => {
    throw new HttpsError("internal", "Failed to update item price.");
  });
  logger.info(`items colletion is updated on ${today()}.`);
  return { success: "items colletion is updated." };
});
