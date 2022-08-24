import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import EachCartItem from "./eachCartItem";

const Cart = () => {
  const [cartitems, setCartitems] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartitems();
  }, []);

  const OrderHandaler = async () => {
    fetch("http://localhost:8080/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          return setError(returnObj.error.message);
        } else {
          navigate("/order");
          setCartitems([]);
          setError();
        }
      })
      .catch();
  };

  const fetchCartitems = async () => {
    fetch("http://localhost:8080/all-cart", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          setError(returnObj.error.message);
          return;
        } else {
          setCartitems(returnObj.cartItems);
        }
      })
      .catch();
  };

  let subTotal = 0;

  cartitems.map((each) => (subTotal += each.total));

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {cartitems[0] !== undefined && <h3>Name: {cartitems[0].userId.name}</h3>}
      {!error &&
        cartitems.length !== 0 &&
        cartitems.map((each) => (
          <EachCartItem
            key={each._id}
            id={each.productId._id}
            title={each.productId.title}
            price={each.productId.price}
            quantity={each.quantity}
            total={each.total}
          />
        ))}
      {cartitems.length !== 0 && (
        <Fragment>
          <h2>Pay: {subTotal}</h2>
          <button onClick={OrderHandaler}>Order</button>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Cart;
