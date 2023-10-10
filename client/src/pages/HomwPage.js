/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
const HomwPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category-list");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      console.log(data);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // getTottal count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  // Filter by category
  const handleFilter = (value, catId) => {
    let updatedChecked = [...checked];
    if (value) {
      updatedChecked.push(catId);
    } else {
      updatedChecked = updatedChecked.filter((c) => c !== catId);
    }
    setChecked(updatedChecked);
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-product", {
        checked,
        radio,
      });
      if (data.Products.length > 0) {
        console.log(data);
        setProducts(data.Products);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row mt-3">
          <div className="col-md-2">
            <h4 className="text-center"> Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories.map((cat) => (
                <Checkbox
                  key={cat._id}
                  onChange={(e) => handleFilter(e.target.checked, cat._id)}
                >
                  {cat.name}
                </Checkbox>
              ))}
            </div>
            <div className="mt-2">
              <h4 className="text-center"> Filter By Price</h4>
              <div className="d-flex flex-column">
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <button
              className="btn btn-secondary w-100 mt-2"
              onClick={() => window.location.reload()}
            >
              Reset filter
            </button>
          </div>
          <div className="col-md-9">
            <h4 className="text-center">All products</h4>
            <div className="w-100 mt-4 d-flex flex-wrap product-container">
              {products?.map((product) => (
                <div className="d-flex m-4 product-card" key={product._id}>
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
                      <button className="btn btn-primary ms-1">
                        More Details
                      </button>
                      <button className="btn btn-secondary ms-1">
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "LoadMore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default HomwPage;
