import {doc, deleteDoc, getDoc, updateDoc} from "firebase/firestore";
import { db } from "@/firebase/init";

const deleteItemField = async (itemId: string) => {
  try {
    await deleteDoc(doc(db, "items", itemId));
  } catch (error) {
    console.error("Error deleting item", error);
    throw new Error("cannot delete item");
  }
}

const deleteItemId =  async (itemId: string) => {
  const userId = "UJY3RAfYDzSTtvBsbl2YVtzpmo73";
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  const userData = userSnap.data();
  if (userData) {
    const updatedItemIds = userData.itemIds.filter((id: string) => id !== itemId);
    await updateDoc(userRef, {
      itemIds: updatedItemIds
    });
  }
}

export const deleteItem = async (itemId: string) => {
  //Itemsのドキュメントの削除と、ユーザーのitemIdsフィールドからitemIdを削除
  try {
    await deleteItemField(itemId);
    await deleteItemId(itemId);
  } catch (error) {
    console.error("Error deleting item", error);
    throw new Error("cannot delete item");
  }
}