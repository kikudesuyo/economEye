import { DocumentReference } from "firebase/firestore";
import { DbDocumentManager } from "@/firebase/firestore/dbManage";
import { getUserDocRef } from "@/firebase/firestore/auth";
import { UserItemData } from "@/utils/types/items";

export const fetchUserItemRefs = async () => {
  try {
    const userDocRef = await getUserDocRef();
    const userCollection = new DbDocumentManager(userDocRef);
    const docData = await userCollection.fetchDocData();
    return docData.itemRefs as DocumentReference[];
  } catch (error) {
    console.error("Error getting documents", error);
    throw new Error("cannot fetch userItemRefs");
  }
};

export const fetchUserItemData = async (): Promise<UserItemData[]> => {
  try {
    const userItemRefs = await fetchUserItemRefs();
    const userItems = await Promise.all(
      userItemRefs.map(async (itemRef) => {
        const doc = new DbDocumentManager(itemRef);
        const item = await doc.fetchDocData();
        const userItemData = { itemRef: itemRef, ...item } as UserItemData;
        return userItemData;
      })
    );
    return userItems;
  } catch (error) {
    console.error("Error getting items", error);
    throw error;
  }
};
