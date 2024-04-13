import { DocumentReference } from "firebase/firestore";

export type PageName =
  | "Home"
  | "Signup"
  | "Login"
  | "Top"
  | "RegisterItem"
  | "ItemList";

export type Condition = "used" | "new" | "both";

export type ItemParams = {
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

export type TagData = {
  tagName: string;
  itemIds: DocumentReference[];
};

type ChartType = "line" | "bar" | "pie" | "doughnut" | "radar" | "polarArea";

export type GraphDataset = {
  type: ChartType;
  label: string;
  data: ItemPriceValue[];
  borderColor?: string;
  backgroundColor?: string;
  borderDash?: number[];
  tension: number;
  pointRadius: number;
};
