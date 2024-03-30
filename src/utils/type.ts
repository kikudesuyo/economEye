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

export interface ItemData {
  condition?: Condition;
  imageId: string;
  itemName: string;
  janCode: string;
  prices: { date: string; value: ItemPriceValue }[];
  url: string;
}

export interface UserItemData extends ItemData {
  itemId: string;
}
