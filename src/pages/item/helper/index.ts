import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from "@/env";
import { ItemParams } from "@/utils/helper/type";
import { isValidName, isValidJanCode } from "./itemValidation";

const app = initializeApp({
  projectId: PROJECT_ID,
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
});

const functions = getFunctions(app);

const addItemPrice = (params: ItemParams) => {
  if (!isValidJanCode(params.janCode)) {
    alert("JANコードが不正です。\n13桁の数字を入力してください。");
    throw new Error("JANコードが不正です。");
  }
  if (!isValidName(params.itemName)) {
    alert("商品名を入力してください");
    throw new Error("商品名が不正です。");
  }

  const addItemPriceFunction = httpsCallable(functions, "registerNewItem");
  addItemPriceFunction(params)
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
      alert("登録に失敗しました。");
    });
};
export default addItemPrice;
