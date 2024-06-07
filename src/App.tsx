import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Top from "@/pages/Top";
import Home from "@/pages/Home";
import Login from "@/pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import "@/assets/styles/destyle.css";
import RegisterItem from "@/pages/item/RegisterItem";
import ItemList from "@/pages/item/ItemList";
import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import { PATHS } from "@/utils/constant";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Router>
        <Header />
        <Routes>
          <Route path={PATHS.HOME} element={<Home />} />
          <Route path={PATHS.SIGNUP} element={<Signup />} />
          <Route path={PATHS.LOGIN} element={<Login />} />
          <Route path={PATHS.TOP} element={<Top />} />
          <Route path={PATHS.REGISTER_ITEM} element={<RegisterItem />} />
          <Route path={PATHS.ITEM_LIST} element={<ItemList />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  );
}
export default App;
