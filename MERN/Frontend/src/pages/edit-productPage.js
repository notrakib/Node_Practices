import { Fragment } from "react";
import { useParams } from "react-router";
import EditProduct from "../components/product/edit-product";

const EditProductPage = () => {
  const params = useParams();

  return (
    <Fragment>
      <EditProduct prodId={params.prodId} />
    </Fragment>
  );
};

export default EditProductPage;
