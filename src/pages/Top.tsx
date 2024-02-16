import { Container } from "@/util/components/Container";
import React from "react";
import { PageName } from "@/util/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Top = ({ setPageName }: Props) => {
  return (
    <Container
      setPageName={setPageName}
      child={
        <>
          <div>
            <p>お知らせ</p>
            <div>2024年2月16日 プレリリース</div>
          </div>
          <div>
            <p>おすすめ</p>
            <div>
              <p>天然水2L</p>
              <p>500円安い</p>
            </div>
          </div>
          <button>商品登録ページへ</button>
        </>
      }
    />
  );
};
