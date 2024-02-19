import { fetchData } from "./item";
import { configDotenv } from "dotenv";
configDotenv();

type Condition = "used" | "new" | "both";

type Sort = "+price";

type AssignedParams = {
  janCode: string;
  condition?: Condition;
};

type ReqParams = {
  appid: string;
  sort: Sort;
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
      jan_code: assignedParams.janCode,
      condition: assignedParams.condition,
    };
    return formattedParams;
  }
  async fetchPrice() {
    const itemData = await fetchData(this.endpoint, this.reqParams);
    return itemData;
  }
}

const item = new YahooItem({ janCode: "9784873115658", condition: "new" });

(async () => {
  console.log(await item.fetchPrice());
})();
