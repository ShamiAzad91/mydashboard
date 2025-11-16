import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./style/App.css";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import PrivateComponent from "./components/PrivateComponent";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import PageNotFound from "./components/pageNotFound";
import ProductList from "./components/ProductList";
import UpdateProduct from "./components/UpdateProduct";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<ProductList/>} />
          <Route path="/add" element={<AddProduct/>} />
          <Route path="/update/:id" element={<UpdateProduct/>} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/logout" element={<h1>logout</h1>} />
        </Route>
          <Route path="*" element={<PageNotFound />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
