import { Fragment, useEffect, useState } from "react";
import ShowEachProduct from "./showEachProduct";

const ShowProduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    fetch("http://localhost:8080/add-cart", {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((returnObj) => {
        if (returnObj.error) {
          setError(returnObj.error.message);
          return;
        } else {
          setProducts(returnObj.products);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Fragment>
      {error && <p>{error}</p>}
      {!error &&
        products.map((each) => (
          <ShowEachProduct
            key={each._id}
            id={each._id}
            title={each.title}
            image={each.image}
            price={each.price}
            description={each.description}
            company={each.company}
            category={each.category}
          />
        ))}
    </Fragment>
  );
};
export default ShowProduct;
