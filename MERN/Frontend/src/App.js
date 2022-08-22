import { Fragment, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart/cart";
import Navbar from "./components/navigation/navbar";
import Welcome from "./components/others/welcome";
import AddProductPage from "./pages/add-productPage";
import EditProductPage from "./pages/edit-productPage";
import ErrorPage from "./pages/errorPage";
import OrderPage from "./pages/orderPage";
import ShowProductPage from "./pages/show-productPage";
import SigninPage from "./pages/signinPage";
import SignupPage from "./pages/signupPage";

const App = () => {
  const [showCart, setCart] = useState(false);

  const changeCartState = () => {
    setCart(!showCart);
  };

  return (
    <Fragment>
      <Navbar onsubmit={changeCartState} />
      {showCart && <Cart />}
      {!showCart && (
        <Routes>
          <Route element={<Welcome />} path="/"></Route>
          <Route element={<SignupPage />} path="/signup"></Route>
          <Route element={<SigninPage />} path="/signin"></Route>
          <Route element={<AddProductPage />} path="/add-product"></Route>
          <Route
            element={<EditProductPage />}
            path="/edit-product/:prodId"
          ></Route>
          <Route element={<ShowProductPage />} path="/show-product"></Route>
          <Route element={<OrderPage />} path="/show-order"></Route>
          <Route element={<ErrorPage />} path="*"></Route>
        </Routes>
      )}
    </Fragment>
  );
};

export default App;
