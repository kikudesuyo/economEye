export type PageName =
  | "Home"
  | "Signup"
  | "Login"
  | "Top"
  | "RegisterItem"
  | "ItemList";

type Condition = "used" | "new" | "both";

export type ItemParams = {
  janCode: string;
  itemName?: string;
  condition?: Condition;
};
