import { UserItemData } from "@/utils/types/items";

import { fetchUserItems } from "@/firebase/firestore/item";
import ItemList from "@/pages/ItemList";

const GuestItemList = () => {
  const fetchGuestData = async (): Promise<UserItemData[]> => {
    const guestData = fetchUserItems();
    return guestData;
  };
  return <ItemList fetchData={fetchGuestData} />;
};

export default GuestItemList;
