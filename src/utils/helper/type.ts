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

export type NumberOrNull = number | null;

export type ItemDb = {
  janCode: string;
  itemName: string;
  imageId: string;
  prices: { date: string; value: NumberOrNull }[];
  condition?: Condition;
};