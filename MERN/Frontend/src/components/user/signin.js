import { Fragment, useRef, useState } from "react";

const Signin = () => {
  const [error, seterror] = useState();
  const emailRef = useRef();
  const passRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passRef.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        console.log(returnObj);
        if (returnObj.error) {
          seterror(returnObj.error.message);
          return;
        } else {
          localStorage.setItem("token", returnObj.token);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      <form>
        <h1>Sign in</h1>
        {error && <p>{error}</p>}
        <div>
          <h3>Email</h3>
          <input ref={emailRef} type="email"></input>
        </div>
        <div>
          <h3>Password</h3>
          <input ref={passRef} type="password"></input>
        </div>

        <button onClick={submitHandler}>Sign in</button>
      </form>
    </Fragment>
  );
};

export default Signin;
