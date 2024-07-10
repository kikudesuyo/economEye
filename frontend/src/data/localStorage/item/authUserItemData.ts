import { LocalStorageService } from "@/data/localStorage/localStorageService";
import { fetchUserItemData } from "@/firebase/firestore/item";
import { ItemData } from "@/utils/types/items";

export const getAuthUserItemData = async () => {
  const localStorageService = new LocalStorageService();
  let authUserItemData =
    localStorageService.getFromLocalStorage("authUserItemData");
  // ローカルストレージにデータがない場合はサンプルデータをセット
  if (authUserItemData.length === 0) {
    authUserItemData = await fetchUserItemData();
    localStorageService.saveToLocalStorage<ItemData[]>(
      "authUserItemData",
      authUserItemData
    );
  }
  return authUserItemData;
};
