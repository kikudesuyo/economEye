import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import {
  fetchUserItems,
  getValueForDate,
  getPriceArray,
} from "@/firebase/firestore/dbFetcher";
import { updateItem } from "@/firebase/functions/functionsHandler";
import Button from "@/components/Button";
import { UserItemData } from "@/utils/type";
import { today } from "@/utils/timeUtils";
import ItemDetail from "@/pages/item/itemDetail";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import DiffFromAverage from "@/components/priceResult/DiffFromAverage";

const ItemList = () => {
  const [ItemData, setItemData] = useState<any>(null);
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
      <div className="flex flex-wrap gap-4 justify-center">
        {ItemData &&
          ItemData.map((item: UserItemData, index: number) => (
            <div
              key={index}
              className="cursor-pointer flex flex-col items-center p-3 border-2 border-slate-300 gap-2 w-1/4 min-w-48"
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
        className="ounded-lg bg-white w-11/12 h-3/5 mx-auto mt-20 p-4 rounded-3xl"
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
