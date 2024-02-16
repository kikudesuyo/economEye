import React from "react";
import { PageName } from "./util/helper/type";
import { Top } from "@/pages/Top";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login/Login";
import "./assets/styles/destyle.css";
import { RegisterItem } from "./pages/RegisterItem";
import { Header } from "@/util/components/Header";
import { Footer } from "@/util/components/Footer";

function App() {
  const [pageName, setPageName] = React.useState<PageName>("Home");

  const pageMap = {
    Home: <Home />,
    Login: <Login setPageName={setPageName} />,
    Top: <Top setPageName={setPageName} />,
    RegisterItem: <RegisterItem />,
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
