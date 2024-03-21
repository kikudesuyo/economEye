import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import YahooItem from "./item/yahooItem";
import { today } from "./helper/timeUtils";
import { ClientParams, ItemDb } from "./utils/type";
import { logger } from "firebase-functions";
import { InventryError } from "./helper/errorUtils";

admin.initializeApp();
const db = admin.firestore();

exports.registerNewItem = onCall(async (request: any) => {
  const uid = request.auth.uid;
  const data: ClientParams = request.data;
  const item = new YahooItem({
    janCode: data.janCode,
    condition: data.condition,
  });
  const price = await item.fetchPrice().catch((error) => {
    throw new HttpsError(error.name, "Failed to fetch price.");
  });
  const imageId = await item.fetchImageId().catch(() => {
    throw new HttpsError("internal", "Failed to fetch image id.");
  });
  const url = await item.fetchUrl().catch(() => {
    throw new HttpsError("internal", "Failed to fetch Url.");
  });
  const itemData: ItemDb = {
    janCode: data.janCode,
    itemName: data.itemName,
    imageId: imageId,
    url: url,
    prices: [{ date: today(), value: price }],
    condition: data.condition,
  };
  const itemRef = await db.collection("items").add(itemData);
  const itemId = itemRef.id;
  const docRef = await db.collection("users").doc(uid).get();
  if (!docRef.exists) {
    throw new Error(`The following uid does not exist${uid}.`);
  }
  const currentItemIds: { [itemId: string]: string[] } = docRef.data() || {};
  currentItemIds["itemIds"].push(itemId);
  await db.collection("users").doc(uid).set(currentItemIds);
  logger.info(`${data.itemName} is successfully registered: on ${today()}.`);
  return { succuess: "success!" };
});

const updateItemPrice = async (
  itemDb: ItemDb
): Promise<{ date: string; value: number | null }[]> => {
  const dbPrices = itemDb.prices;
  for (let i = 0; i < dbPrices.length; i++) {
    const price = dbPrices[i];
    if (price.date === today()) {
      break;
    }
    if (i === dbPrices.length - 1) {
      const item = new YahooItem({
        janCode: itemDb.janCode,
        condition: itemDb.condition,
      });
      let newPrice: number | null;
      try {
        newPrice = await item.fetchPrice();
      } catch (error) {
        if (error instanceof InventryError) {
          newPrice = null;
        } else {
          throw new HttpsError("internal", "Failed to fetch Price.");
        }
      }
      dbPrices.push({ date: today(), value: newPrice });
    }
  }
  return dbPrices;
};

exports.updateItemPrice = onCall(async () => {
  const batch = db.batch();
  const itemSnapshot = await db.collection("items").get();
  await Promise.all(
    itemSnapshot.docs.map(async (doc) => {
      const docId = doc.id;
      const itemDb = doc.data() as ItemDb;
      const latestItemPrices = await updateItemPrice(itemDb);
      const docRef = db.collection("items").doc(docId);
      batch.update(docRef, { prices: latestItemPrices });
    })
  );
  await batch.commit().catch(() => {
    throw new HttpsError("internal", "Failed to update item price.");
  });
  logger.info(`items colletion is updated on ${today()}.`);
  return { success: "items colletion is updated." };
});
