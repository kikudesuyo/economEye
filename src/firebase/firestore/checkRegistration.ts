import {
  getDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { DocumentData } from "firebase-admin/firestore";
import {
  DuplicateItemError,
  DbNotFoundError,
} from "@/firebase/firestore/errorUtils";

import { fetchUserId } from "@/firebase/firestore/dbFetcher";
import { ItemParams } from "@/utils/helper/type";
import { db } from "@/firebase/init";

export class RegistrationValidator {
  itemIds: Promise<string[]>;
  inputData: ItemParams;
  constructor(inputData: ItemParams) {
    this.itemIds = this.fetchUserItemIds();
    this.inputData = inputData;
  }

  async fetchUserItemIds(): Promise<string[]> {
    const uid = await fetchUserId();
    const itemSnap = await getDoc(doc(db, "users", uid));
    if (!itemSnap.exists()) {
      throw new DbNotFoundError("予期せぬエラーが起きています。");
    }
    return itemSnap.data().itemIds;
  }

  private isItemDuplicated(items: DocumentData[]) {
    return items.some(
      (item) =>
        item.janCode === this.inputData.janCode &&
        item.condition === this.inputData.condition
    );
  }

  async checkItemDuplicated() {
    if ((await this.itemIds).length === 0) {
      return;
    }
    const itemsRef = collection(db, "items");
    const itemQuery = query(
      itemsRef,
      where("__name__", "in", await this.itemIds)
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
    if ((await this.itemIds).length >= 30) {
      throw new Error(
        "登録できる商品数の上限に達しています。これ以上登録できません。"
      );
    }
  }
}
