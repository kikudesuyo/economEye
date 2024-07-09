import LocalStorageService from "@/data/localStorage";
import { afternoonTea } from "@/data/sample/afternoonTea";
import { pyuregumi } from "@/data/sample/pyuregumi";
import { smartPhone } from "@/data/sample/smartPhone";

export const getGuestData = () => {
  const localStorageService = new LocalStorageService();
  let guestData = localStorageService.getFromLocalStrage("guestItems");
  // ローカルストレージにデータがない場合はサンプルデータをセット
  if (guestData.length === 0) {
    guestData = [pyuregumi, afternoonTea, smartPhone];
    localStorageService.saveToLocalStrage("guestItems", guestData);
  }
  return guestData;
};
