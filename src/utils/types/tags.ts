import { DocumentReference } from "firebase/firestore";

export type TagData = {
  tagName: string;
  itemIds: DocumentReference[];
};
