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

export const itemPrice = functions.https.onRequest(async (req, res) => {
  try {
    const item = new YahooItem({ janCode: "9784873115658", condition: "new" });
    const price = await item.fetchPrice();
    logger.info("Fetching price for item", +price);
    await db.collection("prices").add({
      janCode: "9784873115658",
      itemName: "test",
      price: {
        data: "2024/02/22",
        price: price,
      }
    });
    res.status(200).send("Data added successfully");
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send("Error adding document");
  }
});
