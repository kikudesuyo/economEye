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

const isItemDuplicated = (valifiedData: ItemParams, items: DocumentData[]) => {
  for (const item of items) {
    if (
      item.janCode === valifiedData.janCode &&
      item.condition === valifiedData.condition
    ) {
      return true;
    }
  }
  return false;
};

export const checkItemDuplicated = async (inputData: ItemParams) => {
  const uid = await fetchUserId();
  const itemSnap = await getDoc(doc(db, "users", uid));
  if (!itemSnap.exists()) {
    throw new DbNotFoundError("予期せぬエラーが起きています。");
  }
  const userItemIds = itemSnap.data().itemIds;
  const itemsRef = collection(db, "items");
  const itemQuery = query(itemsRef, where("__name__", "in", userItemIds));
  const itemSnashot = await getDocs(itemQuery);
  const userItems = itemSnashot.docs.map((doc) => doc.data());
  if (isItemDuplicated(inputData, userItems)) {
    throw new DuplicateItemError("入力した条件の商品は既に登録されています。");
  }
};
