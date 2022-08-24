import React, { Fragment, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const Cart = React.lazy(() => import("./components/cart/cart"));
const Navbar = React.lazy(() => import("./components/navigation/navbar"));
const Welcome = React.lazy(() => import("./components/others/welcome"));
const ForgotPassword = React.lazy(() =>
  import("./components/user/forgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("./components/user/resetPassword")
);
const AddProductPage = React.lazy(() => import("./pages/add-productPage"));
const EditProductPage = React.lazy(() => import("./pages/edit-productPage"));
const ErrorPage = React.lazy(() => import("./pages/errorPage"));
const OrderPage = React.lazy(() => import("./pages/orderPage"));
const ShowProductPage = React.lazy(() => import("./pages/show-productPage"));
const SigninPage = React.lazy(() => import("./pages/signinPage"));
const SignupPage = React.lazy(() => import("./pages/signupPage"));

const App = () => {
  const [showCart, setCart] = useState(false);

  const changeCartState = () => {
    setCart(!showCart);
  };

  return (
    <Fragment>
      <Suspense fallback={<p>...loading</p>}>
        <Navbar onsubmit={changeCartState} />
        {showCart && <Cart />}
        {!showCart && (
          <Routes>
            <Route element={<Welcome />} path="/"></Route>
            <Route element={<SignupPage />} path="/signup"></Route>
            <Route element={<SigninPage />} path="/signin"></Route>
            <Route element={<ForgotPassword />} path="/forgot-password"></Route>
            <Route
              element={<ResetPassword />}
              path="/reset-password/:token"
            ></Route>
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
      </Suspense>
    </Fragment>
  );
};

export default App;
