import {doc, deleteDoc} from "firebase/firestore";
import { db } from "@/firestore/init";

export const deleteItem = async (itemId: string) => {
  try {
    await deleteDoc(doc(db, "items", itemId));
  } catch (error) {
    console.error("Error deleting item", error);
    throw new Error("cannot delete item");
  }
}