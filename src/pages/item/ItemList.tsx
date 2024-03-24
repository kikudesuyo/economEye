import { useEffect, useState } from "react";
import Modal from "react-modal";
import Button from "@/utils/components/Button";
import {
  fetchUserItems,
  getValueForDate,
  getPriceArray,
} from "@/firebase/firestore/dbFetcher";
import { updateItem } from "@/firebase/functions/functionsHandler";
import { ClientItemDb, PageName } from "@/utils/helper/type";
import { today } from "@/pages/item/helper/timeUtils";
import { displayPriceDiffFromAverage } from "@/analysis/isOptimalValue";
import ItemDetail from "./itemDetail";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const ItemList = ({ setPageName }: Props) => {
  const [dbData, setDbData] = useState<any>(null);
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [SelectedItem, setSelectedItem] = useState<ClientItemDb | null>(null);
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
      <div className="w-9/12 mx-auto flex flex-wrap mt-4justify-start">
        {dbData &&
          dbData.map((item: ClientItemDb, index: number) => (
            <div
              key={index}
              className="flex flex-col flex-shrink-0 items-center p-3 border-2 border-slate-300 m-2 gap-2 "
              onClick={() => OpenModal(item)}
            >
              <img src={item.imageId} alt="" />
              <p>{item.itemName}</p>
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
          setPageName("Top");
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
