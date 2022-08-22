import { Fragment, useRef } from "react";

const ShowEachProduct = (props) => {
  const qty = useRef();

  const AddToCartHandaler = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/add-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: props.id,
        price: props.price,
        qty: qty.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        console.log(returnObj);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <h3>Image: {props.image}</h3>
      <h3>Price: {props.price}</h3>
      <h3>Category: {props.category}</h3>
      <h3>Description: {props.description}</h3>
      <h3>Company: {props.company}</h3>
      <input ref={qty} min="1" type="number"></input>
      <button onClick={AddToCartHandaler}>Add</button>
    </Fragment>
  );
};

export default ShowEachProduct;
