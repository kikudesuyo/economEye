import React from "react";
import { Container } from "@/util/components/Container";
import { PageName } from "@/util/helper/type";

type Props = {
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};

export const Home = ({ setPageName }: Props) => {
  return (
    <Container
      setPageName={setPageName}
      child={
        <div className="flex flex-col items-center gap-8 pt-3 ">
          <h1 className="text-3xl">economEye👀</h1>
          <h2 className="text-lg">あなたの生活を豊かに</h2>
          <div>商品の買い時がわかります</div>
        </div>
      }
    />
  );
};
