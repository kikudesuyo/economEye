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

export type ItemDb = {
  janCode: string;
  itemName: string;
  imageId: string;
  prices: { date: string; value: number }[];
  condition?: Condition;
};
