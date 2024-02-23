import React from "react";
import { PageName } from "@/utils/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

const Top = ({ setPageName }: Props) => {
  return (
    <div className="flex flex-col w-80 mx-auto pt-3 gap-8">
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
      <button
        className="bg-slate-300 px-4 py-3 text-center  w-full mx-auto rounded-xl"
        onClick={() => setPageName("RegisterItem")}
      >
        商品登録ページ
      </button>
    </div>
  );
};

export default Top;
