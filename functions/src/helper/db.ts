import * as admin from "firebase-admin";
import { DocumentReference } from "firebase-admin/firestore";
import { HttpsError } from "firebase-functions/v2/https";
import YahooItem from "../item/yahooItem";
import { today } from "../utils/time";
import { ClientParams, ItemData } from "../utils/type";
import { InventryError } from "../utils/customError";
import { logger } from "firebase-functions/v1";

admin.initializeApp();
export const db = admin.firestore();

export const fetchItemData = async (
  inputData: ClientParams
): Promise<ItemData> => {
  const yahooItem = new YahooItem({
    janCode: inputData.janCode,
    condition: inputData.condition,
  });
  const yahooItemData = await yahooItem.fetchCheapestItem().catch(() => {
    throw new HttpsError("internal", "Failed to fetch item data.");
  });
  const itemData: ItemData = {
    janCode: inputData.janCode,
    itemName: inputData.itemName,
    imageId: yahooItemData.image.medium,
    url: yahooItemData.url,
    prices: [{ date: today(), value: yahooItemData.price }],
    condition: inputData.condition,
  };
  return itemData;
};

export const setData = async (
  uid: string,
  itemData: ItemData
): Promise<void> => {
  const itemRef = await db.collection("items").add(itemData);
  const userSnapshot = await db.collection("users").doc(uid).get();
  if (!userSnapshot.exists) {
    throw new HttpsError("internal", `The following uid does not exist${uid}.`);
  }
  const currentItemData = userSnapshot.data() as {
    itemRefs: DocumentReference[];
    tagRefs: DocumentReference[];
  };
  const newItemData = {
    ...currentItemData,
    itemRefs: [...currentItemData.itemRefs, itemRef],
  };
  await db.collection("users").doc(uid).set(newItemData);
};

export const updateItem = async (itemData: ItemData): Promise<ItemData> => {
  const dates = itemData.prices.map((price) => price.date);
  if (dates.includes(today())) return itemData;
  const yahooItem = new YahooItem({
    janCode: itemData.janCode,
    condition: itemData.condition,
  });
  const newItemData: ItemData = { ...itemData };
  const yahooItemData = await yahooItem.fetchCheapestItem().catch((error) => {
    if (error instanceof InventryError) {
      logger.info("Item not found on Yahoo.");
      return { url: "", price: null };
    } else {
      throw new HttpsError("internal", "Failed to fetch item data.");
    }
  });
  newItemData["url"] = yahooItemData.url;
  newItemData.prices.push({ date: today(), value: yahooItemData.price });
  return itemData;
};
