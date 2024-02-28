import { fetchData } from "./item";
import { configDotenv } from "dotenv";
configDotenv();

type Condition = "used" | "new" | "both";

type Sort = "+price";

export type AssignedParams = {
  janCode: string;
  condition?: Condition;
};

type ReqParams = {
  appid: string;
  sort: Sort;
  results: number;
  jan_code: string;
  condition?: Condition;
};

class YahooItem {
  endpoint: string;
  reqParams: ReqParams;
  constructor(assignedParams: AssignedParams) {
    this.endpoint =
      "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch";
    this.reqParams = this.formatParams(
      assignedParams,
      process.env.YAHOO_CLIENT_ID as string
    );
  }
  formatParams(assignedParams: AssignedParams, appId: string) {
    const formattedParams: ReqParams = {
      appid: appId,
      sort: "+price",
      results: 1,
      jan_code: assignedParams.janCode,
      condition: assignedParams.condition,
    };
    return formattedParams;
  }
  async fetchPrice(): Promise<string> {
    const itemData = await fetchData(this.endpoint, this.reqParams);
    return itemData.hits[0].price;
  }
}

export default YahooItem;
