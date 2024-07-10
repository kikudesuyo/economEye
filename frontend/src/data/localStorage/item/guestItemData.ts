import { UserItemData } from "@/utils/types/items";
import { LocalStorageService } from "@/data/localStorage/localStorageService";
import { afternoonTea } from "@/data/sample/afternoonTea";
import { pyuregumi } from "@/data/sample/pyuregumi";
import { smartPhone } from "@/data/sample/smartPhone";

export const getGuestItemData = () => {
  const localStorageService = new LocalStorageService();
  let guestData = localStorageService.getFromLocalStorage("guestItems");
  // ローカルストレージにデータがない場合はサンプルデータをセット
  if (guestData.length === 0) {
    guestData = [pyuregumi, afternoonTea, smartPhone];
    localStorageService.saveToLocalStorage<UserItemData[]>(
      "guestItems",
      guestData
    );
  }
  return guestData;
};
