import { fetchData } from "./item";
import { InventryError } from "../helper/errorUtils";
import { configDotenv } from "dotenv";
import { AssignedParams, ReqParams } from "../utils/type";

configDotenv();

class YahooItem {
  endpoint: string;
  reqParams: ReqParams;
  itemData: any; //Yahoo data
  constructor(assignedParams: AssignedParams) {
    this.endpoint =
      "https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch";
    this.reqParams = this.formatParams(
      assignedParams,
      process.env.YAHOO_CLIENT_ID as string
    );
  }

  private async fetchCheapestItem() {
    if (!this.itemData) {
      this.itemData = await fetchData(this.endpoint, this.reqParams).catch(
        () => {
          const error = new Error("Failed to access YahooAPI.");
          error.name = "internal";
          throw error;
        }
      );
      if (this.itemData.hits.length === 0) {
        throw new InventryError("item doesn't found on Yahoo.");
      }
    }
    return this.itemData.hits[0];
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

  async fetchPrice(): Promise<number> {
    const itemData = await this.fetchCheapestItem();
    return itemData.price;
  }

  async fetchImageId(): Promise<string> {
    const itemData = await this.fetchCheapestItem();
    return itemData.image.medium;
  }
  async fetchUrl(): Promise<string> {
    const itemData = await this.fetchCheapestItem();
    return itemData.url;
  }
}

export default YahooItem;
