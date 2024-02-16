import React from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  child: React.ReactNode;
};
const Container = ({ child }: Props) => {
  return (
    <>
      <Header />
      {child}
      <Footer />
    </>
  );
};

export default Container;
