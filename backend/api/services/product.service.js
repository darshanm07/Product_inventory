const Products = require("../models/product.model.js");

const createProduct = async (name, description, quantity, categories) => {
  try {
    const existing = await Products.findOne({ name });

    if (existing) {
      return {
        flag: false,
        data: "module.alreadyExists",
      };
    }

    const product = new Products({
      name,
      description,
      quantity,
      categories,
    });

    await product.save();

    return { flag: true, data: product };
  } catch (error) {
    logger.error("Error - createProduct Service", error);
    throw new Error(error);
  }
};

const getProductById = async (id) => {
  try {
    const product = await Products.findById(id);
    if (!product) {
      return { flag: false, data: "module.notFound" };
    }
    return { flag: true, data: product };
  } catch (error) {
    logger.error("Error - getProductById Service", error);
    throw new Error(error);
  }
};

const getAllProduct = async (body) => {
  try {
    const { search, categories, page = 1, pageSize = 10 } = body;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // Case-insensitive search
      filter.description = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    if (categories) {
      filter.categories = categories;
    }

    const skip = (page - 1) * pageSize;

    const products = await Products.find(filter).skip(skip).limit(pageSize);

    const totalCount = await Products.countDocuments(filter);

    if (!products || products.length === 0) {
      return { flag: false, data: "module.notFound" };
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      flag: true,
      data: {
        products,
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalPages: totalPages,
          totalCount: totalCount,
        },
      },
    };
  } catch (error) {
    logger.error("Error - getProductById Service", error);
    throw new Error(error);
  }
};

const updateProduct = async (id, body) => {
  try {
    const { name, description, quantity, categories } = body;

    const updateData = {
      ...(name && { name: name }),
      ...(description && { description: description }),
      ...(quantity && { quantity: quantity }),
      ...(categories && { categories: categories }),
    };

    if (Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ flag: false, data: "No valid fields to update" });
    }

    // Find the product by ID and update it with the new data
    const updatedProduct = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ flag: false, data: "module.notFound" });
    }

    return {
      flag: true,
      data: updatedProduct,
    };
  } catch (error) {
    logger.error("Error - updateProduct Service", error);
    throw new Error(error);
  }
};

const deleteProduct = async (id) => {
  try {
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return { flag: false, data: "module.notFound" };
    }
    return { flag: true, data: product };
  } catch (error) {
    logger.error("Error - deleteProduct Service", error);
    throw new Error(error);
  }
};

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  deleteProduct,
  updateProduct,
};
