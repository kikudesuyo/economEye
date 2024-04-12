import { DocumentReference, runTransaction } from "firebase/firestore";
import { db } from "@/firebase/init";
import {
  DbDocumentManager,
  DbCollectionManager,
} from "@/firebase/firestore/updateItem";
import { TagData } from "@/utils/type";

export const createTag = async (tagData: TagData, userId: string) => {
  const tagCollection = new DbCollectionManager("tags");
  const tagRef = await tagCollection.addDataAndFetchDocRef(tagData);
  const usersCollection = new DbDocumentManager("users", userId);
  const currentUserData = await usersCollection.fetchDocData();
  const updatedTagIds = [...currentUserData.tagIds, tagRef];
  await usersCollection.updateSpecificFields({
    tagIds: updatedTagIds,
  });
};

export const updateTagName = async (tagName: string, tagId: string) => {
  const tagCollection = new DbDocumentManager("tags", tagId);
  await tagCollection.updateSpecificFields({
    tagName: tagName,
  });
};

//未テスト
export const deleteTag = async (tagId: string, userId: string) => {
  const tagCollection = new DbDocumentManager("tags", tagId);
  const tagRef = await tagCollection.fetchDocRef();
  await tagCollection.deleteDocument();
  const usersCollection = new DbDocumentManager("users", userId);
  const currentUserData = await usersCollection.fetchDocData();
  const updatedTagIds = currentUserData.tagIds.filter(
    (id: DocumentReference) => id !== tagRef
  );
  await usersCollection.updateSpecificFields({
    tagIds: updatedTagIds,
  });
};

export const changeTag = async (
  previousTagId: string,
  nextTagId: string,
  itemId: string
) => {
  try {
    await runTransaction(db, async () => {
      const previousTagCollection = new DbDocumentManager(
        "tags",
        previousTagId
      );
      const previousItemIds = await previousTagCollection.fetchDocData();
      const updatedPreviousTagIds = previousItemIds.itemIds.filter(
        (id: string) => id !== itemId
      );
      if (updatedPreviousTagIds.length === previousItemIds.itemIds.length) {
        throw new Error("designated itemId not found in previous tag");
      }
      await previousTagCollection.updateSpecificFields({
        itemIds: updatedPreviousTagIds,
      });
      const nextTagCollection = new DbDocumentManager("tags", nextTagId);
      nextTagCollection.updateSpecificFields({
        itemIds: [...updatedPreviousTagIds, itemId],
      });
    });
  } catch (error) {
    console.error("Error changing tag", error);
    throw error;
  }
};
