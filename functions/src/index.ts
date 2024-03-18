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
  prices: { [key: string]: string };
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
      condition: data.condition,
      imageId: imageId,
      prices: {
        [today()]: price,
      },
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
