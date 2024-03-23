export type PageName =
  | "Home"
  | "Signup"
  | "Login"
  | "Top"
  | "RegisterItem"
  | "ItemList"
  | "ItemDetail";

export type Condition = "used" | "new" | "both";

export type ItemParams = {
  janCode: string;
  itemName: string;
  condition?: Condition;
};

export type NumberOrNull = number | null;

export interface ItemDb {
  condition?: Condition;
  imageId: string;
  itemName: string;
  janCode: string;
  prices: { date: string; value: NumberOrNull }[];
  url: string;
}

export interface ClientItemDb extends ItemDb {
  itemId: string;
}
