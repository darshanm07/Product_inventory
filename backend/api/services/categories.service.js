const Category = require("../models/category.model");

const seedCategories = async () => {
  try {
    const existingCategories = await Category.find();
    if (existingCategories.length === 0) {
      const categories = [
        { name: "Electronics" },
        { name: "Clothing" },
        { name: "Books" },
        { name: "Home & Garden" },
        { name: "Sports" },
        { name: "Toys" },
        { name: "Food & Beverages" },
        { name: "Health & Beauty" },
      ];

      await Category.insertMany(categories);
      console.log("Categories seeded successfully");
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

const getAllCategory = async () => {
  try {
    const category = await Category.find();
    if (!category) {
      return { flag: false, data: "module.notFound" };
    }
    return { flag: true, data: category };
  } catch (error) {
    logger.error("Error - getcategory Service", error);
    throw new Error(error);
  }
};

module.exports = {
  seedCategories,
  getAllCategory,
};
