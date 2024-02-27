/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import YahooItem from "./item/yahooItem";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// import * as functions from "firebase-functions";
import * as functions from "firebase-functions/v2";
import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

// CORS Settings
const cors = require("cors")({ origin: true });

export const addItemPrice = functions.https.onRequest(async (req, res) => {
  try {
    cors(req, res, async () => {
      const item = new YahooItem({
        janCode: "9784873115658",
        condition: "new",
      });
      const price = await item.fetchPrice();
      logger.info("Fetching price for item", +price);
      await db.collection("items").add({
        janCode: "9784873115658",
        itemName: "HOGEHOGE",
        price: {
          data: "2024/02/29",
          value: price,
        },
      });
      // res.status(200).send("Success!");
    });
  } catch (error) {
    console.error("Error adding document: ", error);
    // res.status(500).send("Error adding document");
  }
});
