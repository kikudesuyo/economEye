import YahooItem from "./item/yahooItem";
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { AssignedParams } from "./item/yahooItem";

admin.initializeApp();
const db = admin.firestore();

const cors = require("cors")({
  origin: [
    "https://economeye-d5146.web.app",
    "https://economeye-d5146.firebaseapp.com",
    "http://127.0.0.1:5173",
  ],
});

export const addItemPrice = functions.https.onRequest(async (req, res) => {
  try {
    cors(req, res, async () => {
      const data: AssignedParams = req.body.data;
      const item = new YahooItem({
        janCode: data.janCode,
        condition: data.condition,
      });
      const price = await item.fetchPrice();
      console.log("item data:", price);
      await db.collection("items").add({
        janCode: data.janCode,
        itemName: "エリエール",
        price: {
          date: "2024/02/28",
          value: price,
        },
      });
      res.status(200).json({ data: { message: "Success!" } });
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).json({ data: { massage: "Error adding document" } });
  }
});
