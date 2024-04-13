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
  const updatedTagRefs = [...currentUserData.tagRefs, tagRef];
  await usersCollection.updateSpecificFields({
    tagRefs: updatedTagRefs,
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
  await tagCollection.deleteDocument();
  const usersCollection = new DbDocumentManager(userDocRef);
  const currentUserData = await usersCollection.fetchDocData();
  const updatedTagRefs = currentUserData.tagRefs.filter(
    (ref: DocumentReference) => ref.path !== tagDocRef.path
  );
  if (updatedTagRefs.length === currentUserData.tagRefs.length) {
    throw new Error("designated tagRef not found in user");
  }
  await usersCollection.updateSpecificFields({
    tagRefs: updatedTagRefs,
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
      const previousItemRefs = await previousTagCollection.fetchDocData();
      const updatedPreviousTagRefs = previousItemRefs.itemRefs.filter(
        (DocRef: DocumentReference) => DocRef.path !== itemDocRef.path
      );
      if (updatedPreviousTagRefs.length === previousItemRefs.itemRefs.length) {
        throw new Error("designated itemRefs not found in previous tag");
      }
      await previousTagCollection.updateSpecificFields({
        itemRefs: updatedPreviousTagRefs,
      });
      const nextTagCollection = new DbDocumentManager(nextTagDocRef);
      nextTagCollection.updateSpecificFields({
        itemRefs: [...updatedPreviousTagRefs, itemDocRef],
      });
    });
  } catch (error) {
    console.error("Error changing tag", error);
    throw error;
  }
};
