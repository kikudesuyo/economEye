import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/useAuth";
import ItemModal from "@/pages/item/ItemModal";
import ItemCard from "@/pages/item/ItemCard";
import AddItemButton from "@/pages/item/AddItemButton";
import Button from "@/components/Button";
import Main from "@/components/Main";
import { UserItemData } from "@/utils/types/items";
import { PATHS } from "@/utils/Paths";

import { getAuthUserItemData } from "@/data/localStorage/item/authUserItemData";
import { getGuestItemData } from "@/data/localStorage/item/guestItemData";

const ItemList = () => {
  const { isAuthenticated, loading } = useAuth();
  const [ItemData, setItemData] = useState<UserItemData[]>([]);
  const [IsOpen, setIsOpen] = useState<boolean>(false);
  const [SelectedItem, setSelectedItem] = useState<UserItemData | null>(null);
  const navigate = useNavigate();

  Modal.setAppElement("#root");

  useEffect(() => {
    if (!loading) {
      (async () => {
        try {
          const itemData = isAuthenticated
            ? await getAuthUserItemData()
            : getGuestItemData();
          setItemData(itemData);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [isAuthenticated, loading]);

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
            <ItemCard
              item={item}
              openModal={() => {
                openModal(item);
              }}
              key={index}
            />
          ))}
        <AddItemButton />
      </div>
      <Button
        label="トップページに戻る"
        style="w-3/5 mx-auto"
        func={() => {
          navigate(PATHS.TOP);
        }}
      />
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        className="mx-auto mt-12 w-11/12 rounded-3xl bg-white p-4"
        isOpen={IsOpen}
        onRequestClose={closeModal}
      >
        {SelectedItem && <ItemModal item={SelectedItem} onClose={closeModal} />}
      </Modal>
    </Main>
  );
};

export default ItemList;
