import Button from "@/utils/components/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/utils/helper/constant";

const Top = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-80 mx-auto mt-3">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">お知らせ</h1>
          <div className="p-5 grid grid-cols-1 gap-4 border-2">
            <ul className="list-disc pl-5 flex flex-col gap-4">
              <li>2024年2月16日 プレリリース</li>
              <li>2024年2月24日 スタイルの修正</li>
            </ul>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">おすすめ</h2>
          <div className="flex flex-col  border-2 p-5 gap-2">
            <div className="flex justify-between">
              <p>天然水2L</p>
              <p>いつもより500円安い</p>
            </div>
            <div className="flex justify-between">
              <p>午後の紅茶2L</p>
              <p>いつもより800円安い</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-14 gap-6">
          <Button
            label="商品登録ページ"
            func={() => {
              navigate(PATHS.REGISTER_ITEM);
            }}
          />
          <Button
            label="商品一覧ページ"
            func={() => {
              navigate(PATHS.ITEM_LIST);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Top;
