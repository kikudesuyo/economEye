import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase/init";
import { ItemParams } from "@/utils/helper/type";
import {
  isValidName,
  isValidJanCode,
} from "@/firebase/functions/itemValidation";
import { checkItemDuplicated } from "@/firebase/firestore/checkDuplication";

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
    alert(error.message);
    throw new Error(`${error.name}: ${error.message}`);
  });
  return await registerNewItemFunction(params).catch((error) => {
    if (error instanceof FirebaseError) {
      if (error.code === "functions/not-found") {
        alert("入力した条件の商品は見つかりませんでした。");
      } else if (error.code === "functions/internal") {
        alert("登録に失敗しました。もう一度入力してください");
      } else if (error.code === "functions/resource-exhausted") {
        alert("登録できる商品数の上限に達しました。 これ以上登録できません。");
      }
    } else {
      alert("予期せぬエラーが発生しました。もう一度入力してください。");
    }
    throw new Error("登録に失敗しました。");
  });
};

export const updateItem = async () => {
  const updateItemFunction = httpsCallable(functions, "updateItem");
  updateItemFunction()
    .then((result) => {
      console.log(result.data);
    })
    .catch((error) => {
      console.error(error);
      alert("更新に失敗しました。");
    });
};
