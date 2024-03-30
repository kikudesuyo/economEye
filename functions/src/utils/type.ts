type Condition = "used" | "new" | "both";
type Sort = "+price";

//for Yahoo API
export type AssignedParams = {
  janCode: string;
  condition?: Condition;
};

//for Yahoo API
export type ReqParams = {
  appid: string;
  sort: Sort;
  results: number;
  jan_code: string;
  condition?: Condition;
};

export type ClientParams = {
  janCode: string;
  itemName: string;
  condition: Condition;
};

type ItemPriceValue = number | null;

export type ItemData = {
  janCode: string;
  itemName: string;
  imageId: string;
  url: string;
  prices: { date: string; value: ItemPriceValue }[];
  condition?: Condition;
};
