import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const [error, setError] = useState();
  const emailRef = useRef();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        console.log(returnObj);
        if (returnObj.error) {
          setError(returnObj.error.message);
          return;
        } else {
          navigate(returnObj.link);
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      <form>
        <h1>Enter Email</h1>
        {error && <p>{error}</p>}
        <div>
          <h3>Email</h3>
          <input ref={emailRef} type="email"></input>
        </div>

        <button onClick={submitHandler}>Submit</button>
      </form>
    </Fragment>
  );
};

export default ForgotPassword;
