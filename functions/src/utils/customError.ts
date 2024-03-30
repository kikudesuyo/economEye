import { FunctionsErrorCode } from "firebase-functions/v2/https";

export class InventryError extends Error {
  name: FunctionsErrorCode;
  constructor(message: string) {
    super(message);
    this.name = "not-found";
  }
}
