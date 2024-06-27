import { HttpsError } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";

import { db, updateItem } from "./db";
import { ItemData } from "../utils/type";
import { today } from "../utils/time";

export async function updateAllItems() {
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
}
