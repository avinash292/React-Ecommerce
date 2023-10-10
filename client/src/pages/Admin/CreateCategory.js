import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import CategoryForm from "../../components/Form/categoryForm";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/category-list");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!");
    }
  };

  // handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("something Went Wrong!");
    }
  };

  // Delete category
  const handleDelete = async (cid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category//${cid}`
      );
      if (data.success) {
        toast.success("Category Deleted Successfully!");
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("something Went Wrong!");
    }
  };

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3>Manage category</h3>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75 mt-4">
              <table className="table">
                <thead className="bg-dark">
                  <tr>
                    <th scope="col">NAME</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((category) => (
                    <tr key={category._id}>
                      <td style={{ textTransform: "capitalize" }}>
                        {category.name}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name);
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(category._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
