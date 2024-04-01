import { fetchData } from "./item";
import { InventryError } from "../utils/customError";
import { configDotenv } from "dotenv";
import { AssignedParams, ReqParams } from "../utils/type";

configDotenv();

type YahooItemData = {
  hits: {
    price: number;
    point: {
      amount: number;
      times: number;
      premiumAmount: number;
      premiumTimes: number;
    };
    image: { small: string; medium: string };
    url: string;
    shipping: { code: number; name: string };
  }[];
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

  async fetchCheapestItem() {
    const itemData: YahooItemData = await fetchData(
      this.endpoint,
      this.reqParams
    );
    if (itemData.hits.length === 0) {
      throw new InventryError("item doesn't found on Yahoo.");
    }
    return itemData.hits[0];
  }

  private formatParams(assignedParams: AssignedParams, appId: string) {
    const formattedParams: ReqParams = {
      appid: appId,
      sort: "+price",
      results: 1,
      jan_code: assignedParams.janCode,
      condition: assignedParams.condition,
      shipping: "free",
    };
    return formattedParams;
  }
}

export default YahooItem;
