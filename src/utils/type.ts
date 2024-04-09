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
  itemId: string;
}

export type GraphDataset = {
  label: string;
  data: ItemPriceValue[];
  borderColor: string;
  borderDash?: number[];
  tension: number;
  legend?: string;
  pointRadius: number;
};

export type GraphProps = {
  datasets: GraphDataset[];
  xLabels: string[];
};
