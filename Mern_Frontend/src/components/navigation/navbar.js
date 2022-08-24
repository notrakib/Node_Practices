import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signedinAction } from "../../store/signin-slice";

const Navbar = (props) => {
  const signedin = useSelector((state) => state.signin.signedin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    props.onsubmit();
  };

  const LogoutHandaler = (event) => {
    event.preventDefault();
    dispatch(signedinAction.logout());
    navigate("/signin");
  };

  return (
    <Fragment>
      <ul>
        <li>
          <NavLink to="/">Welcome</NavLink>
        </li>
        {signedin && (
          <li>
            <NavLink to="/add-product">Add Products</NavLink>
          </li>
        )}
        <li>
          <NavLink to="/show-product?page=1">Products</NavLink>
        </li>
        {signedin && (
          <li>
            <NavLink to="/show-order">Orders</NavLink>
          </li>
        )}
        {signedin && (
          <li>
            <button onClick={submitHandler}>Cart</button>
          </li>
        )}
        {!signedin && (
          <li>
            <NavLink to="/signup">Sign up</NavLink>
          </li>
        )}
        {!signedin && (
          <li>
            <NavLink to="/signin">Sign in</NavLink>
          </li>
        )}
        {signedin && (
          <li>
            <button onClick={LogoutHandaler}>Logout</button>
          </li>
        )}
      </ul>
    </Fragment>
  );
};

export default Navbar;
