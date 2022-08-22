import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const submitHandler = (event) => {
    event.preventDefault();
    props.onsubmit();
  };

  return (
    <Fragment>
      <ul>
        <li>
          <NavLink to="/">Cart System</NavLink>
        </li>
        <li>
          <NavLink to="/add-product">Add Products</NavLink>
        </li>
        <li>
          <NavLink to="/show-product">Products</NavLink>
        </li>
        <li>
          <NavLink to="/show-order">Orders</NavLink>
        </li>
        <li>
          <NavLink to="*">User</NavLink>
        </li>
        <li>
          <button onClick={submitHandler}>Cart</button>
        </li>
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      </ul>
    </Fragment>
  );
};

export default Navbar;
