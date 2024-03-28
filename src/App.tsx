import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Top from "@/pages/Top";
import Home from "@/pages/Home";
import Login from "@/pages/auth/login/Login";
import Signup from "@/pages/auth/signup/Signup";
import "@/assets/styles/destyle.css";
import RegisterItem from "@/pages/item/RegisterItem";
import ItemList from "./pages/item/ItemList";
import Header from "@/utils/components/Header";
import Footer from "@/utils/components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/top" element={<Top />} />
        <Route path="/registerItem" element={<RegisterItem />} />
        <Route path="/itemList" element={<ItemList />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
