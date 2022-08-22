import { Fragment, useRef } from "react";

const EditProduct = (props) => {
  const title = useRef();
  const file = useRef();
  const price = useRef();
  const category = useRef();
  const description = useRef();
  const company = useRef();

  console.log(props.prodId);

  const submitHandler = (event) => {
    event.preventDefault();
    const newProduct = {
      title: title.current.value,
      file: file.current.value,
      price: price.current.value,
      category: category.current.value,
      description: description.current.value,
      company: company.current.value,
    };
    console.log(newProduct);
  };

  return (
    <Fragment>
      <h1>Edit Product</h1>
      <form>
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

        <button onClick={submitHandler}>Add</button>
      </form>
    </Fragment>
  );
};

export default EditProduct;
