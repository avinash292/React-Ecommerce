import slugify from "slugify";
import categoryModal from "../models/categoryModal.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).send({ message: "Name is required" }); // Corrected status code to 400 Bad Request
    }
    const existingCategory = await categoryModal.findOne({ name });
    if (existingCategory) {
      return res.status(409).send({
        success: false, // Corrected success value to false
        message: "Category Already Exists!",
      });
    }
    const category = await new categoryModal({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.error(error); // Corrected the console.log to console.error
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating category",
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModal.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "category updated successfully!",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "errot while updating category",
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModal.find({});
    res.status(200).send({
      success: true,
      category,
      message: "All Category List",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting All category",
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoryModal.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      category,
      message: "Selected category",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting single Category",
    });
  }
};

export const deleteCategoryContriller = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while deleting category",
    });
  }
};
