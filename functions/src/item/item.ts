import { configDotenv } from "dotenv";
import axios from "axios";

class Item {
  // constructor(id: string) {}
  async fetchPrice(endpoint: string) {
    const res = await axios.get(endpoint);
    console.log(res.data);
  }
}

const item = new Item();
configDotenv();
item.fetchPrice(
  `https://webservice.rakuten.co.jp/explorer/proxy?url=https%3A%2F%2Fapp.rakuten.co.jp%2Fservices%2Fapi%2FIchibaItem%2FSearch%2F20220601%3Fformat%3Djson%26keyword%3D4909411084790%26applicationId%3D${process.env.RAKUTEN_APP_ID}&applicationId=${process.env.RAKUTEN_APP_ID}`
);
