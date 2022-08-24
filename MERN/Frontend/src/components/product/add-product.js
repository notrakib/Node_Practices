import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const [error, setError] = useState();
  const title = useRef();
  const image = useRef();
  const price = useRef();
  const category = useRef();
  const description = useRef();
  const company = useRef();
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title.current.value);
    formData.append("image", image.current.files[0]);
    formData.append("price", price.current.value);
    formData.append("category", category.current.value);
    formData.append("description", description.current.value);
    formData.append("company", company.current.value);

    fetch("http://localhost:8080/add-product", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        console.log(returnObj);
        if (returnObj.error) {
          return setError(returnObj.error.message);
        } else {
          title.current.value = "";
          image.current.value = null;
          price.current.value = "";
          category.current.value = "";
          description.current.value = "";
          company.current.value = "";
          navigate("/show-product?page=1");
          setError();
        }
      })
      .catch();
  };

  return (
    <Fragment>
      {error && <p>{error}</p>}

      <h1>Add Product</h1>
      <form onSubmit={submitHandler}>
        <h3>Title</h3>
        <input ref={title} type="text"></input>
        <h3>Image</h3>
        <input ref={image} type="file"></input>
        <h3>Price</h3>
        <input ref={price} type="number"></input>
        <h3>Category</h3>
        <input ref={category} type="text"></input>
        <h3>Description</h3>
        <input ref={description} type="text"></input>
        <h3>Company</h3>
        <input ref={company} type="text"></input>

        <button>Add</button>
      </form>
    </Fragment>
  );
};

export default AddProduct;
