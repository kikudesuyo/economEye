import { DocumentReference, runTransaction } from "firebase/firestore";
import { db } from "@/firebase/init";
import {
  DbDocumentManager,
  DbCollectionManager,
} from "@/firebase/firestore/dbManage";
import { TagData } from "@/utils/type";

export const createTag = async (
  tagData: TagData,
  userDocRef: DocumentReference
) => {
  const tagCollection = new DbCollectionManager("tags");
  const tagRef = await tagCollection.addDataAndFetchDocRef(tagData);
  const usersCollection = new DbDocumentManager(userDocRef);
  const currentUserData = await usersCollection.fetchDocData();
  const updatedTagIds = [...currentUserData.tagIds, tagRef];
  await usersCollection.updateSpecificFields({
    tagIds: updatedTagIds,
  });
};

export const updateTagName = async (
  newTagName: string,
  tagDocRef: DocumentReference
) => {
  const tagCollection = new DbDocumentManager(tagDocRef);
  await tagCollection.updateSpecificFields({
    tagName: newTagName,
  });
};

export const deleteTag = async (
  tagDocRef: DocumentReference,
  userDocRef: DocumentReference
) => {
  const tagCollection = new DbDocumentManager(tagDocRef);
  const tagRef = await tagCollection.fetchDocRef();
  await tagCollection.deleteDocument();
  const usersCollection = new DbDocumentManager(userDocRef);
  const currentUserData = await usersCollection.fetchDocData();
  const updatedTagIds = currentUserData.tagIds.filter(
    (id: DocumentReference) => id.path !== tagRef.path
  );
  if (updatedTagIds.length === currentUserData.tagIds.length) {
    throw new Error("designated tagId not found in user");
  }
  await usersCollection.updateSpecificFields({
    tagIds: updatedTagIds,
  });
};

export const changeTag = async (
  previousTagDocRef: DocumentReference,
  nextTagDocRef: DocumentReference,
  itemDocRef: DocumentReference
) => {
  try {
    await runTransaction(db, async () => {
      const previousTagCollection = new DbDocumentManager(previousTagDocRef);
      const previousItemIds = await previousTagCollection.fetchDocData();
      const updatedPreviousTagIds = previousItemIds.itemIds.filter(
        (DocRef: DocumentReference) => DocRef.path !== itemDocRef.path
      );
      if (updatedPreviousTagIds.length === previousItemIds.itemIds.length) {
        throw new Error("designated itemId not found in previous tag");
      }
      await previousTagCollection.updateSpecificFields({
        itemIds: updatedPreviousTagIds,
      });
      const nextTagCollection = new DbDocumentManager(nextTagDocRef);
      nextTagCollection.updateSpecificFields({
        itemIds: [...updatedPreviousTagIds, itemDocRef],
      });
    });
  } catch (error) {
    console.error("Error changing tag", error);
    throw error;
  }
};
