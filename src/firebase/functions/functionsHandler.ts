import { FirebaseError } from "firebase/app";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/firebase/init";
import { ItemParams } from "@/utils/types/items";
import {
  isValidName,
  isValidJanCode,
} from "@/firebase/functions/itemValidation";
import { RegistrationValidator } from "@/firebase/firestore/checkRegistration";

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
  const validator = new RegistrationValidator(params);
  await validator.checkItemDuplicated().catch((error) => {
    alert(error.message);
    throw new Error(`${error.name}: ${error.message}`);
  });
  await validator.checkItemLimit().catch((error) => {
    alert(error.message);
    throw new Error(`${error.name}: ${error.message}`);
  });
  return await registerNewItemFunction(params).catch((error) => {
    if (!(error instanceof FirebaseError)) {
      alert("予期せぬエラーが発生しました。もう一度入力してください。");
    } else if (error.code === "functions/not-found") {
      alert("入力した条件の商品は見つかりませんでした。");
    } else if (error.code === "functions/internal") {
      console.log(error.message);
      alert("登録に失敗しました。もう一度入力してください");
    } else if (error.code === "functions/resource-exhausted") {
      alert("登録できる商品数の上限に達しました。 これ以上登録できません。");
    }
    throw new Error("登録に失敗しました。");
  });
};
