import {
  collection,
  getDocs,
  query,
  where,
  DocumentReference,
} from "firebase/firestore";
import { DocumentData } from "firebase-admin/firestore";

import { fetchUserItemRefs } from "@/firebase/firestore/item";
import { DuplicateItemError } from "@/firebase/firestore/errors";
import { db } from "@/firebase/init";
import { ItemSearchParams } from "@/utils/types/items";

export class RegistrationValidator {
  itemRefs: Promise<DocumentReference[]>;
  inputData: ItemSearchParams;
  constructor(inputData: ItemSearchParams) {
    this.itemRefs = fetchUserItemRefs();
    this.inputData = inputData;
  }

  private isItemDuplicated(items: DocumentData[]) {
    return items.some(
      (item) =>
        item.janCode === this.inputData.janCode &&
        item.condition === this.inputData.condition
    );
  }

  async checkItemDuplicated() {
    if ((await this.itemRefs).length === 0) {
      return;
    }
    const itemsRef = collection(db, "items");
    const itemQuery = query(
      itemsRef,
      where("__name__", "in", await this.itemRefs)
    );
    const itemSnapshot = await getDocs(itemQuery);
    const userItems = itemSnapshot.docs.map((doc) => doc.data());
    if (this.isItemDuplicated(userItems)) {
      throw new DuplicateItemError(
        "入力した条件の商品は既に登録されています。"
      );
    }
  }

  async checkItemLimit() {
    if ((await this.itemRefs).length >= 30) {
      throw new Error(
        "登録できる商品数の上限に達しています。これ以上登録できません。"
      );
    }
  }
}
