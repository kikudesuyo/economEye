import React from "react";
import { Header } from "@/util/components/Header";
import { Footer } from "@/util/components/Footer";
import { PageName } from "@/util/helper/type";

type Props = {
  child: React.ReactNode;
  setPageName: React.Dispatch<React.SetStateAction<PageName>>;
};
export const Container = ({ child, setPageName }: Props) => {
  return (
    <>
      <Header setPageName={setPageName} />
      <div className="flex flex-col flex-1">{child}</div>
      <Footer />
    </>
  );
};
