import {
  doc,
  setDoc,
  updateDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/firebase/init";

export class DataUpdater<DbmModelType extends DocumentData> {
  docRef: DocumentReference;
  constructor(collectionName: string, docId: string) {
    this.docRef = doc(db, collectionName, docId);
  }
  updatePartialData = async (updateData: DbmModelType) => {
    await updateDoc(this.docRef, updateData);
  };
  updateAllData = async (updateData: DbmModelType) => {
    await setDoc(this.docRef, updateData);
  };
}
