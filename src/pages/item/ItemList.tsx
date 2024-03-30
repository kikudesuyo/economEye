import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import {
  fetchUserItems,
  getValueForDate,
  getPriceArray,
} from "@/firebase/firestore/dbFetcher";
import { updateItem } from "@/firebase/functions/functionsHandler";
import Button from "@/utils/components/Button";
import { ClientItemDb } from "@/utils/helper/type";
import { today } from "@/pages/item/helper/timeUtils";
import { displayPriceDiffFromAverage } from "@/analysis/isOptimalValue";
import ItemDetail from "./itemDetail";
import { PATHS } from "@/utils/helper/constant";

const ItemList = () => {
  const [dbData, setDbData] = useState<any>(null);
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [SelectedItem, setSelectedItem] = useState<ClientItemDb | null>(null);
  const navigate = useNavigate();

  Modal.setAppElement("#root");

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchUserItems();
        setDbData(data);
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

  const OpenModal = (item: ClientItemDb) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const CloseModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 mt-4 mx-4">
        {dbData &&
          dbData.map((item: ClientItemDb, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 border-2 border-slate-300 gap-2"
              onClick={() => OpenModal(item)}
            >
              <img src={item.imageId} alt="" />
              <p className="max-w-full truncate">{item.itemName}</p>
              <p>{getValueForDate(item, today())}円</p>
              <p>
                {displayPriceDiffFromAverage(
                  getPriceArray(item),
                  getValueForDate(item, today())
                )}
              </p>
            </div>
          ))}
      </div>
      <Button
        label="商品データの更新"
        func={() => {
          updateItem();
        }}
      />
      <Button
        label="トップページに戻る"
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
    </div>
  );
};

export default ItemList;
