import YahooItem from "./item/yahooItem";
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { Condition } from "./item/yahooItem";
import { today } from "./helper/timeUtils";

admin.initializeApp();
const db = admin.firestore();

const cors = require("cors")({
  origin: [
    "https://economeye-d5146.web.app",
    "https://economeye-d5146.firebaseapp.com",
    "http://127.0.0.1:5173",
  ],
});

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
};

export const registerNewItem = functions.https.onRequest(async (req, res) => {
  try {
    cors(req, res, async () => {
      const data: ClientParams = req.body.data;
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
        prices: {
          [today()]: price,
        },
      };
      await db.collection("items").add(itemData);
      res.status(200).json({ data: { message: "Success!" } });
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ data: { massage: "Error adding document" } });
  }
});

export const updateItem = functions.https.onRequest(async (req, res) => {
  try {
    cors(req, res, async () => {
      const data: ClientParams = req.body.data;
      const item = new YahooItem({
        janCode: data.janCode,
        condition: data.condition,
      });
      const price = await item.fetchPrice();
      const isExistItem = db
        .collection("items")
        .where("janCode", "==", data.janCode)
        .where("itemName", "==", data.itemName);
      if (isExistItem) {
        await db.collection("items").add({ prices: { [today()]: price } });
        res.status(200).json({ data: { message: "Success!" } });
      } else {
        res.status(400).json({ data: { message: "Item not found" } });
      }
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ data: { massage: "Error adding document" } });
  }
});
