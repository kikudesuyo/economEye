import React from "react";
import { PageName } from "./util/helper/type";
import { Top } from "./pages/Top";
import { Login } from "./pages/Login/Login";
import "./assets/styles/destyle.css";

function App() {
  const [pageName, setPageName] = React.useState<PageName>("Top");
  if (pageName === "Top") {
    return <Top setPageName={setPageName} />;
  } else if (pageName === "Login") {
    return <Login setPageName={setPageName} />;
  }
}
export default App;
