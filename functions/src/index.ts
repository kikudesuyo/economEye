import { onCall, HttpsError } from "firebase-functions/v2/https";
import { today } from "./utils/time";
import { ClientParams, ItemData } from "./utils/type";
import { logger } from "firebase-functions";
import { fetchItemData, setData, updateItem, db } from "./helper/db";

exports.registerNewItem = onCall(async (request: any) => {
  const uid = request.auth.uid;
  const data: ClientParams = request.data;
  const itemData = await fetchItemData(data);
  await setData(uid, itemData);
  logger.info(`${data.itemName} is successfully registered: on ${today()}.`);
  return { succuess: "success!" };
});

exports.updateItem = onCall(async () => {
  const batch = db.batch();
  const itemSnapshot = await db.collection("items").get();
  await Promise.all(
    itemSnapshot.docs.map(async (doc) => {
      const docId = doc.id;
      const itemData = doc.data() as ItemData;
      const latestItem = await updateItem(itemData);
      const docRef = db.collection("items").doc(docId);
      batch.update(docRef, latestItem);
    })
  );
  await batch.commit().catch(() => {
    throw new HttpsError("internal", "Failed to update item price.");
  });
  logger.info(`items colletion is updated on ${today()}.`);
  return { success: "items colletion is updated." };
});
