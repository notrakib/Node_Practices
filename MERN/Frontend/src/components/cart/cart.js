import { Fragment, useEffect, useState } from "react";
import EachCartItem from "./eachCartItem";

const Cart = () => {
  const [cartitems, setCartitems] = useState([]);
  const [error, seterror] = useState();

  useEffect(() => {
    fetchCartitems();
  }, []);

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
          seterror(returnObj.error.message);
          return;
        } else {
          setCartitems(returnObj.cartItems);
        }
      })
      .catch((err) => console.log(err));
  };

  let subTotal = 0;

  {
    cartitems.map((each) => (subTotal += each.total));
  }

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {cartitems[0] !== undefined && <h3>Name: {cartitems[0].userId.name}</h3>}
      {!error &&
        cartitems.map((each) => (
          <EachCartItem
            key={each._id}
            title={each.productId.title}
            price={each.productId.price}
            quantity={each.quantity}
            total={each.total}
          />
        ))}
      <h2>Pay: {subTotal}</h2>
    </Fragment>
  );
};
export default Cart;
