import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-products/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row container mt-2">
        {product ? (
          <>
            <div className="col-md-6">
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
              />
            </div>
            <div className="col-md-6">
              <h1 className="text-center">Product Details</h1>
              <h6>Name : {product.name}</h6>
              <h6>Description : {product.description}</h6>
              <h6>Price : {product.price}</h6>
              <h6>Category : {product.category.name}</h6>
              <button className="btn btn-secondary ms-1">ADD TO CART</button>
            </div>
          </>
        ) : (
          <p>Loading...</p> // You can add a loading indicator here
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
