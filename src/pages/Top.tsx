import React from "react";
import { PageName } from "@/util/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Top = ({ setPageName }: Props) => {
  return (
    <div className="flex flex-col w-80 mx-auto pt-3 gap-8">
      <div>
        <h1 className="text-2xl font-bold">お知らせ</h1>
        <div className="border-4 p-5">
          <p>2024年2月16日 プレリリース</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">おすすめ</h2>
        <div className="flex flex-col  border-4 p-5 gap-2">
          <div className="flex justify-between">
            <p>天然水2L</p>
            <p>500円安い</p>
          </div>
          <div className="flex justify-between">
            <p>午後の紅茶2L</p>
            <p>800円安い</p>
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
