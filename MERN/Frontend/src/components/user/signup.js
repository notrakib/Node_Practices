import { Fragment, useRef } from "react";

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passRef.current.value,
        confirm_password: confirmPassRef.current.value,
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
      <form>
        <h1>Create an Account</h1>
        <div>
          <h3>Name</h3>
          <input ref={nameRef} type="text"></input>
        </div>
        <div>
          <h3>Email</h3>
          <input ref={emailRef} type="email"></input>
        </div>
        <div>
          <h3>Password</h3>
          <input ref={passRef} type="password"></input>
        </div>
        <div>
          <h3>Confirm Password</h3>
          <input ref={confirmPassRef} type="password"></input>
        </div>
        <button onClick={submitHandler}>Sign up</button>
      </form>
    </Fragment>
  );
};

export default Signup;
