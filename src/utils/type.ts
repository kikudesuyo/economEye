import { DocumentReference } from "firebase/firestore";

export type Condition = "used" | "new" | "both";

export type ItemPriceValue = number | null;
export type Prices = { date: string; value: ItemPriceValue }[];

export interface ItemData {
  condition?: Condition;
  imageId: string;
  itemName: string;
  janCode: string;
  prices: Prices;
  url: string;
}

export interface UserItemData extends ItemData {
  itemRef: DocumentReference;
}

export type TagData = {
  tagName: string;
  itemIds: DocumentReference[];
};
