import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { getValueForDate, getPriceArray } from "@/firebase/firestore/dbFetcher";
import { fetchUserItems } from "@/firebase/firestore/item";
import { updateItem } from "@/firebase/functions/functionsHandler";
import Button from "@/components/Button";
import { UserItemData } from "@/utils/type";
import { today } from "@/utils/timeUtils";
import ItemDetail from "@/pages/item/ItemDetail";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import DiffFromAverage from "@/pages/item/DiffFromAverage";

const ItemList = () => {
  const [ItemData, setItemData] = useState<UserItemData[] | null>(null);
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [SelectedItem, setSelectedItem] = useState<UserItemData | null>(null);
  const navigate = useNavigate();

  Modal.setAppElement("#root");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserItems();
        setItemData(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      document.body.style.overflow = "auto";
    };
    if (!IsOpen) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [IsOpen]);

  const OpenModal = (item: UserItemData) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const CloseModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  return (
    <Main style="my-8 gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {ItemData &&
          ItemData.map((item: UserItemData, index: number) => (
            <div
              key={index}
              className="flex cursor-pointer flex-col items-center gap-2 border-2 border-slate-300 p-3 hover:shadow-lg"
              onClick={() => OpenModal(item)}
            >
              <img src={item.imageId} alt="" className="w-1/3" />
              <p className="max-w-full truncate">{item.itemName}</p>
              <p className="max-w-full truncate">
                {getValueForDate(item, today())}円
              </p>
              <DiffFromAverage
                prices={getPriceArray(item)}
                price={getValueForDate(item, today())}
                style="text-sm"
              />
            </div>
          ))}
      </div>
      <Button
        label="商品データの更新"
        style="w-3/5 mx-auto"
        func={() => {
          updateItem();
        }}
      />
      <Button
        label="トップページに戻る"
        style="w-3/5 mx-auto"
        func={() => {
          navigate(PATHS.TOP);
        }}
      />
      <Modal
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.5)" },
        }}
        className="mx-auto mt-20  w-11/12 rounded-3xl bg-white p-4"
        isOpen={IsOpen}
        onRequestClose={CloseModal}
      >
        {SelectedItem && (
          <ItemDetail item={SelectedItem} onClose={CloseModal} />
        )}
      </Modal>
    </Main>
  );
};

export default ItemList;
