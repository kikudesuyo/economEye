import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "@/assets/styles/destyle.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { AuthProvider } from "@/contexts/AuthProvider";

import Top from "@/pages/Top";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import RegisterItem from "@/pages/RegisterItem";

import ScrollToTop from "@/utils/ScrollTop";
import { PATHS } from "@/utils/Paths";
import ItemList from "@/pages/ItemList";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path={PATHS.HOME} element={<Home />} />
            <Route path={PATHS.SIGNUP} element={<Signup />} />
            <Route path={PATHS.LOGIN} element={<Login />} />
            <Route path={PATHS.TOP} element={<Top />} />
            <Route path={PATHS.REGISTER_ITEM} element={<RegisterItem />} />
            <Route path={PATHS.ITEM_LIST} element={<ItemList />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}
export default App;
