import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/v2/https";
import YahooItem from "../item/yahooItem";
import { today } from "../utils/time";
import { ClientParams, ItemDb } from "../utils/type";
import { InventryError } from "../utils/customError";

admin.initializeApp();
export const db = admin.firestore();

export const fetchItemData = async (
  inputData: ClientParams
): Promise<ItemDb> => {
  const item = new YahooItem({
    janCode: inputData.janCode,
    condition: inputData.condition,
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
    janCode: inputData.janCode,
    itemName: inputData.itemName,
    imageId: imageId,
    url: url,
    prices: [{ date: today(), value: price }],
    condition: inputData.condition,
  };
  return itemData;
};

export const setData = async (uid: string, itemData: ItemDb): Promise<void> => {
  const itemRef = await db.collection("items").add(itemData);
  const itemId = itemRef.id;
  const docRef = await db.collection("users").doc(uid).get();
  if (!docRef.exists) {
    throw new HttpsError("internal", `The following uid does not exist${uid}.`);
  }
  const currentItemIds: { [itemId: string]: string[] } = docRef.data() || {};
  currentItemIds["itemIds"].push(itemId);
  await db.collection("users").doc(uid).set(currentItemIds);
};

export const updateItem = async (itemDb: ItemDb): Promise<ItemDb> => {
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
        const url = await item.fetchUrl();
        itemDb["url"] = url;
      } catch (error) {
        if (error instanceof InventryError) {
          newPrice = null;
          itemDb["url"] = "";
        } else {
          throw new HttpsError("internal", "Failed to fetch Price.");
        }
      }
      itemDb.prices.push({ date: today(), value: newPrice });
    }
  }
  return itemDb;
};
