import { useNavigate } from "react-router-dom";
import { PATHS } from "@/utils/Paths";
import plus from "@/assets/imgs/logo/plus.svg";

const AddItemButton = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-md border-2 border-gray-300 p-3 hover:bg-gray-200"
      onClick={() => {
        navigate(PATHS.REGISTER_ITEM);
      }}
    >
      <div className="flex flex-col items-center gap-1">
        <img width="50" height="50" src={plus} />
        <p className="max-w-full truncate font-bold">商品登録</p>
      </div>
    </div>
  );
};

export default AddItemButton;
