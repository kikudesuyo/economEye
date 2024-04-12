import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  deleteDoc,
  setDoc,
  updateDoc,
  DocumentReference,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/init";

export class DbCollectionManager<DbmModelType extends DocumentData> {
  collectionRef: CollectionReference;
  constructor(collectionName: string) {
    this.collectionRef = collection(db, collectionName);
  }
  addDataAndFetchDocRef = async (data: DbmModelType) => {
    const docRef = await addDoc(this.collectionRef, data);
    return docRef;
  };
}

export class DbDocumentManager<DbmModelType extends DocumentData> {
  docRef: DocumentReference;
  constructor(collectionName: string, docId: string) {
    this.docRef = doc(db, collectionName, docId);
  }
  fetchDocRef = async (): Promise<DocumentReference> => {
    return this.docRef;
  };
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
