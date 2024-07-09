import { UserItemData } from "@/utils/types/items";

import { getGuestData } from "@/data/localStorage/GuestData";
import ItemList from "@/pages/ItemList";

const GuestItemList = () => {
  const fetchGuestData = async (): Promise<UserItemData[]> => {
    const guestData = getGuestData();
    return guestData;
  };
  return <ItemList fetchData={fetchGuestData} />;
};

export default GuestItemList;
