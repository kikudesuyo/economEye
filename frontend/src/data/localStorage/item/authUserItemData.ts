import { LocalStorageService } from "@/data/localStorage/localStorageService";
import { fetchUserItemData } from "@/firebase/firestore/item";

export const getAuthUserItemData = async () => {
  const localStorageService = new LocalStorageService();
  let authUserItemData =
    localStorageService.getFromLocalStorage("authUserItemData");
  // ローカルストレージにデータがない場合はサンプルデータをセット
  if (authUserItemData.length === 0) {
    authUserItemData = await fetchUserItemData();
    localStorageService.saveToLocalStorage(
      "authUserItemData",
      authUserItemData
    );
  }
  return authUserItemData;
};
