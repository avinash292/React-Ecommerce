import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center">All products</h4>

            <div className="w-100 mt-4 d-flex flex-wrap product-container">
              {products?.map((product) => (
                <div className="d-flex m-4 product-card" key={product._id}>
                  <Link
                    to={`/dashboard/admin/product/${product.slug}`}
                    className="product-link"
                  >
                    <div
                      className="card"
                      style={{ width: "18rem" }}
                      key={product._id}
                    >
                      <img
                        src={`/api/v1/product/product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.photo}
                      />
                      <div className="card-body">
                        <h5
                          className="card-title"
                          style={{ textTransform: "capitalize" }}
                        >
                          {product.name}
                        </h5>
                        <p style={{ textTransform: "capitalize" }}>
                          Price : {product.price}
                        </p>
                        <p style={{ textTransform: "capitalize" }}>
                          Quantity : {product.quantity}
                        </p>
                        <p
                          className="card-text"
                          style={{ textTransform: "capitalize" }}
                        >
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
