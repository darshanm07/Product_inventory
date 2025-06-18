const productServices = require("../../services/product.service");

const createProduct = catchAsync(async (req, res) => {
  const { name, description, quantity, categories } = req.body;
  const result = await productServices.createProduct(
    name,
    description,
    quantity,
    categories
  );
  if (result.flag) {
    res.message = _localize("module.create", req, "Product");
    return utils.successResponse(result.data, res);
  } else {
    message = _localize(result.data, req, "Product");
    return utils.failureResponse(message, res);
  }
});

const getProductById = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.getProductById(productId);
  if (result.flag) {
    res.message = _localize("module.get", req, "Product");
    return utils.successResponse(result.data, res);
  } else {
    message = _localize(result.data, req, "Product");
    return utils.failureResponse(message, res);
  }
});

const getAllProduct = catchAsync(async (req, res) => {
  const result = await productServices.getAllProduct(req.body);

  if (result.flag) {
    res.message = _localize("module.get", req, "Product");
    return utils.successResponse(result.data, res);
  } else {
    message = _localize(result.data, req, "Product");
    return utils.failureResponse(message, res);
  }
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.updateProduct(productId, req.body);
  if (result.flag) {
    res.message = _localize("module.update", req, "Product");
    return utils.successResponse(result.data, res);
  } else {
    message = _localize(result.data, req, "Product");
    return utils.failureResponse(message, res);
  }
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.deleteProduct(productId);
  if (result.flag) {
    res.message = _localize("module.delete", req, "Product");
    return utils.successResponse(result.data, res);
  } else {
    message = _localize(result.data, req, "Product");
    return utils.failureResponse(message, res);
  }
});

module.exports = {
  createProduct,
  getProductById,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
