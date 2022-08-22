import { Fragment } from "react";
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
  const token = localStorage.getItem("token");

  const submitHandler = (event) => {
    event.preventDefault();
    props.onsubmit();
  };

  const LogoutHandaler = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
  };

  return (
    <Fragment>
      <ul>
        <li>
          <NavLink to="/">Welcome</NavLink>
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
          <button onClick={submitHandler}>Cart</button>
        </li>
        {!token && (
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
        )}
        {!token && (
          <li>
            <NavLink to="/signin">Sign in</NavLink>
          </li>
        )}
        {token && (
          <li>
            <button onClick={LogoutHandaler}>Logout</button>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default Navbar;
