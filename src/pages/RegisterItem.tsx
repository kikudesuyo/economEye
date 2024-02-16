import { Container } from "@/util/components/Container";
import React from "react";
import { PageName } from "@/util/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const RegisterItem = ({ setPageName }: Props) => {
  return (
    <Container
      setPageName={setPageName}
      child={
        <div className="items-center w-80 mx-auto">
          <div className="flex flex-col pt-8 gap-4">
            <input
              className="border-2  px-4 py-3 text-center"
              type="text"
              placeholder="商品のURLを入力してください"
            />
            <button className="bg-slate-300 px-4 py-3 text-center rounded-xl ">
              登録
            </button>
          </div>
        </div>
      }
    />
  );
};
