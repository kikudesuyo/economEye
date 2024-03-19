import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import YahooItem from "./item/yahooItem";
import { Condition } from "./item/yahooItem";
import { today } from "./helper/timeUtils";
import { InventryError } from "./helper/errorUtils";

admin.initializeApp();
const db = admin.firestore();

// const cors = require("cors")({
//   origin: [
//     "https://economeye-d5146.web.app",
//     "https://economeye-d5146.firebaseapp.com",
//     "http://127.0.0.1:5173",
//   ],
// });

type ClientParams = {
  janCode: string;
  itemName: string;
  condition: Condition;
};

type ItemDb = {
  janCode: string;
  itemName: string;
  imageId: string;
  prices: { date: string; value: number }[];
  condition?: Condition;
};

exports.registerNewItem = onCall(async (request: any) => {
  try {
    const uid = request.auth.uid;
    const data: ClientParams = request.data;
    const item = new YahooItem({
      janCode: data.janCode,
      condition: data.condition,
    });
    const price = await item.fetchPrice();
    const imageId = await item.fetchImageId();
    const itemData: ItemDb = {
      janCode: data.janCode,
      itemName: data.itemName,
      imageId: imageId,
      prices: [{ date: today(), value: price }],
      condition: data.condition,
    };
    const itemRef = await db.collection("items").add(itemData);
    const itemId = itemRef.id;
    const docRef = await db.collection("users").doc(uid).get();
    if (!docRef.exists) {
      throw new Error(`The following uid does not exist${uid}`);
    }
    const currentItemIds: { [itemId: string]: string[] } = docRef.data() || {};
    currentItemIds["itemIds"].push(itemId);
    await db.collection("users").doc(uid).set(currentItemIds);
    return { succuess: "success!" };
  } catch (error) {
    if (error instanceof InventryError) {
      throw new HttpsError("not-found", error.message);
    } else {
      throw new HttpsError("internal", "Unexpected error occurred");
    }
  }
});

const updateItemPrice = async (
  itemDb: ItemDb
): Promise<{ date: string; value: number }[]> => {
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
      const newPrice = await item.fetchPrice();
      dbPrices.push({ date: today(), value: newPrice });
    }
  }
  return dbPrices;
};

exports.updateItemPrice = onCall(async () => {
  try {
    const batch = db.batch();
    const itemSnapshot = await db.collection("items").get();
    await Promise.all(
      itemSnapshot.docs.map(async (doc) => {
        const docId = doc.id;
        const itemDb = doc.data() as ItemDb;
        const latestItemPrices = await updateItemPrice(itemDb);
        const docRef = db.collection("items").doc(docId);
        batch.update(docRef, { prices: latestItemPrices });
        return { success: "hogehoge" };
      })
    );
    await batch.commit();
    return { success: "items colletion is updated." };
  } catch (error) {
    throw new HttpsError("internal", "Failed to update item prices");
  }
});
