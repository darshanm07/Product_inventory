const categoryServices = require("../../services/categories.service");

const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategory();

  if (result.flag) {
    res.message = _localize("module.get", req, "Category");
    return utils.successResponse(result.data, res);
  } else {
    message = _localize(result.data, req, "Category");
    return utils.failureResponse(message, res);
  }
});

module.exports = {
  getAllCategory,
};
