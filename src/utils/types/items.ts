import { DocumentReference } from "firebase/firestore";

type Condition = "used" | "new" | "both";

export type ItemSearchParams = {
  janCode: string;
  itemName: string;
  condition?: Condition;
};

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
