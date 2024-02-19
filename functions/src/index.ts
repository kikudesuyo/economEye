/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import YahooItem from "./item/yahooItem";
// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const itemPrice = onRequest(async (request, response) => {
  const item = new YahooItem({ janCode: "9784873115658", condition: "new" });
  logger.info("Fetching price for item", { structuredData: true });
  response.status(200).send(await item.fetchPrice());
});
