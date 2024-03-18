import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { FirebaseError } from "firebase/app";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from "@/env";
import { ItemParams } from "@/utils/helper/type";
import {
  isValidName,
  isValidJanCode,
} from "@/pages/item/helper/itemValidation";
import { checkItemDuplicated } from "@/pages/item/helper/checkDuplication";
import { DuplicateItemError } from "@/pages/item/helper/errorUtils";

const app = initializeApp({
  projectId: PROJECT_ID,
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
});

const functions = getFunctions(app);

export const addNewItem = async (params: ItemParams) => {
  if (!isValidJanCode(params.janCode)) {
    alert("JANコードが不正です。\n13桁の数字を入力してください。");
    throw new Error("JANコードが不正です。");
  }
  if (!isValidName(params.itemName)) {
    alert("商品名を入力してください");
    throw new Error("商品名が不正です。");
  }
  const addItemPriceFunction = httpsCallable(functions, "registerNewItem");
  try {
    await checkItemDuplicated(params);
    return await addItemPriceFunction(params);
  } catch (error) {
    if (error instanceof FirebaseError) {
      if (error.code === "functions/not-found") {
        alert("入力した条件の商品は見つかりませんでした。");
      } else if (error.message.includes("functions/internal")) {
        alert("登録に失敗しました。もう一度入力してください");
      }
    } else if (error instanceof DuplicateItemError) {
      alert("入力した条件の商品は既に登録されています。");
    } else {
      alert("予期せぬエラーが発生しました。もう一度入力してください。");
    }
    throw new Error("Failed registering new item.");
  }
};

export const updateItem = async () => {
  const updateItemPriceFunction = httpsCallable(functions, "updateItem");
  updateItemPriceFunction()
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
      alert("更新に失敗しました。");
    });
};
