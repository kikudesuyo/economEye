import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { fetchUserItems } from "@/firebase/firestore/dbFetcher";
import { updateItem } from "@/firebase/functions/functionsHandler";
import Button from "@/components/Button";
import { UserItemData } from "@/utils/type";
import ItemDetail from "@/pages/item/ItemDetail";
import { PATHS } from "@/utils/constant";
import Main from "@/components/Main";
import ItemCard from "@/pages/item/ItemCard";

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

  const openModal = (item: UserItemData) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  return (
    <Main style="my-8 gap-8">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {ItemData &&
          ItemData.map((item: UserItemData, index: number) => (
            <ItemCard item={item} openModal={openModal} key={index} />
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
        className="mx-auto mt-20 h-3/5 w-11/12 rounded-3xl bg-white p-4"
        isOpen={IsOpen}
        onRequestClose={closeModal}
      >
        {SelectedItem && (
          <ItemDetail item={SelectedItem} onClose={closeModal} />
        )}
      </Modal>
    </Main>
  );
};

export default ItemList;
