import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase/init";

export const getDocRef = (
  collectionName: string,
  docId: string
): DocumentReference => {
  return doc(db, collectionName, docId);
};

export class DbCollectionManager<DbmModelType extends DocumentData> {
  collectionRef: CollectionReference;
  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName);
  }
  addDataAndFetchDocRef = async (data: DbmModelType) => {
    const docRef = await addDoc(this.collectionRef, data);
    return docRef;
  };
  fetchCollectionRef = async () => {
    return this.collectionRef;
  };
}

export class DbDocumentManager<DbmModelType extends DocumentData> {
  docRef: DocumentReference;
  constructor(docRef: DocumentReference) {
    this.docRef = docRef;
  }
  fetchDocData = async (): Promise<DocumentData> => {
    const docSnap = await getDoc(this.docRef);
    if (!docSnap.exists()) {
      throw new Error("Document does not exist");
    }
    return docSnap.data();
  };
  updateSpecificFields = async (updateData: DbmModelType) => {
    await updateDoc(this.docRef, updateData);
  };
  setEntireFields = async (updateData: DbmModelType) => {
    await setDoc(this.docRef, updateData);
  };
  deleteDocument = async () => {
    await deleteDoc(this.docRef);
  };
}
