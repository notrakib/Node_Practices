import { Fragment, useRef, useState } from "react";

const ShowEachProduct = (props) => {
  const [error, setError] = useState();
  const qty = useRef();

  const AddToCartHandaler = (event) => {
    event.preventDefault();

    if (qty.current.value < 1) {
      return setError("Qunatity cannot be less than 1");
    }

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
        if (returnObj.error) {
          setError(returnObj.error.message);
        } else {
          qty.current.value = "";
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <h3>Image: {props.image}</h3>
      <h3>Price: {props.price}</h3>
      <h3>Category: {props.category}</h3>
      <h3>Description: {props.description}</h3>
      <h3>Company: {props.company}</h3>
      {error && <p>{error}</p>}
      <input ref={qty} min="1" type="number"></input>
      <button onClick={AddToCartHandaler}>Add</button>
    </Fragment>
  );
};

export default ShowEachProduct;
