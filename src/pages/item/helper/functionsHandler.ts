import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import {functions} from "@/firestore/init";
import { ItemParams } from "@/utils/helper/type";
import {
  isValidName,
  isValidJanCode,
} from "@/pages/item/helper/itemValidation";
import { checkItemDuplicated } from "@/firestore/checkDuplication";

export const addNewItem = async (params: ItemParams) => {
  if (!isValidJanCode(params.janCode)) {
    alert("JANコードが不正です。\n13桁の数字を入力してください。");
    throw new Error("JANコードが不正です。");
  }
  if (!isValidName(params.itemName)) {
    alert("商品名を入力してください");
    throw new Error("商品名が不正です。");
  }
  const registerNewItemFunction = httpsCallable(functions, "registerNewItem");
    await checkItemDuplicated(params).catch((error) => {
      alert(error.message)
      throw new Error(`${error.name}: ${error.message}`)
    })
    return await registerNewItemFunction(params).catch((error) => {
      if (error instanceof FirebaseError) {
        if (error.code === "functions/not-found") {
          alert("入力した条件の商品は見つかりませんでした。");
        } else if (error.message.includes("functions/internal")) {
          alert("登録に失敗しました。もう一度入力してください");
        }
      } else {
        alert("予期せぬエラーが発生しました。もう一度入力してください。");
      }
    }
  );
};

export const updateItem = async () => {
  const updateItemPriceFunction = httpsCallable(functions, "updateItemPrice");
  updateItemPriceFunction()
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
      alert("更新に失敗しました。");
    });
};
