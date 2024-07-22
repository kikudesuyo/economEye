import { LocalStorageService } from "@/data/localStorage/localStorageService";
import { fetchUserItemData } from "@/firebase/firestore/item";
import { UserItemData } from "@/utils/types/items";

export const getAuthUserItemData = async () => {
  const localStorageService = new LocalStorageService();
  let authUserItemData =
    localStorageService.getFromLocalStorage("authUserItemData");
  // ローカルストレージにデータがない場合はサンプルデータをセット
  if (authUserItemData.length === 0) {
    authUserItemData = await fetchUserItemData();
    localStorageService.saveToLocalStorage<UserItemData[]>(
      "authUserItemData",
      authUserItemData
    );
  }
  return authUserItemData;
};

export const removeAuthUserItemData = () => {
  const localStorageService = new LocalStorageService();
  localStorageService.removeFromLocalStorage("authUserItemData");
};
