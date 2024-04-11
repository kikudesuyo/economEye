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
} from "firebase/firestore";
import { db } from "@/firebase/init";

export class DbDocumentManager<DbmModelType extends DocumentData> {
  ref: CollectionReference;
  constructor(collectionName: string) {
    this.ref = collection(db, collectionName);
  }
  registerData = async (data: DbmModelType) => {
    await addDoc(this.ref, data);
  };
}

export class DbFieldManager<DbmModelType extends DocumentData> {
  docRef: DocumentReference;
  constructor(collectionName: string, docId: string) {
    this.docRef = doc(db, collectionName, docId);
  }
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
