import React from "react";
import { PageName } from "@/util/helper/type";
import Top from "@/pages/Top";
import Home from "@/pages/Home";
import Login from "@/pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import "@/assets/styles/destyle.css";
import RegisterItem from "@/pages/item/RegisterItem";
import ItemList from "@/pages/item/ItemList";
import Header from "@/util/components/Header";
import Footer from "@/util/components/Footer";

function App() {
  const [pageName, setPageName] = React.useState<PageName>("Home");

  const pageMap = {
    Home: <Home />,
    Signup: <Signup setPageName={setPageName} />,
    Login: <Login setPageName={setPageName} />,
    Top: <Top setPageName={setPageName} />,
    RegisterItem: <RegisterItem setPageName={setPageName} />,
    ItemList: <ItemList />,
  };
  return (
    <>
      <Header setPageName={setPageName} />
      <main className="flex flex-col flex-1">{pageMap[pageName]}</main>
      <Footer />
    </>
  );
}
export default App;
