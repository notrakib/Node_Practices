import { Fragment, useRef, useState } from "react";

const AddProduct = () => {
  const [error, seterror] = useState();
  const title = useRef();
  const file = useRef();
  const price = useRef();
  const category = useRef();
  const description = useRef();
  const company = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/add-product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title.current.value,
        file: file.current.value,
        price: price.current.value,
        category: category.current.value,
        description: description.current.value,
        company: company.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          seterror(returnObj.error.message);
          return;
        } else return;
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {!error && (
        <Fragment>
          {" "}
          <h1>Add Product</h1>
          <form onSubmit={submitHandler}>
            <h3>Title</h3>
            <input ref={title} type="text"></input>
            <h3>Image</h3>
            <input ref={file} type="file"></input>
            <h3>Price</h3>
            <input ref={price} type="number"></input>
            <h3>Category</h3>
            <input ref={category} type="text"></input>
            <h3>Description</h3>
            <input ref={description} type="text"></input>
            <h3>Company</h3>
            <input ref={company} type="text"></input>

            <button>Add</button>
          </form>{" "}
        </Fragment>
      )}
    </Fragment>
  );
};

export default AddProduct;
