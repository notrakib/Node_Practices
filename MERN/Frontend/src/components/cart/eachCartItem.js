import { Fragment } from "react";

const EachCartItem = (props) => {
  return (
    <Fragment>
      <h3>Title: {props.title}</h3>
      <h3>Price: {props.price}</h3>
      <h3>Quantity: {props.quantity}</h3>
      <h3>Total: {props.quantity * props.price}</h3>
    </Fragment>
  );
};

export default EachCartItem;
