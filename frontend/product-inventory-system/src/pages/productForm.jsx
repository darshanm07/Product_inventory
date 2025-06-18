import {
  Box,
  Button,
  TextField,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest, postRequest, putRequest } from "../api/apiServices";
import { apiList } from "../api/api";
import Toast from "../utils/toast";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    categories: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // if ID exists, it's edit mode
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  useEffect(() => {
    fetchCategories();
    if (isEditMode) fetchProduct();
  }, [id]);

  const fetchCategories = async () => {
    const res = await getRequest(apiList.getAllCategory);
    setCategories(res.data || []);
  };

  const fetchProduct = async () => {
    const res = await getRequest(apiList.getProductById(id));
    const prod = res.data;
    setFormData({
      name: prod.name,
      description: prod.description,
      quantity: prod.quantity,
      categories: [prod.categories],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.categories.length) {
      Toast("Please fill all required fields", "error");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        categories: formData.categories[0],
      };

      if (isEditMode) {
        await putRequest(apiList.updateProduct(id), payload);
        Toast("Product updated successfully", "success");
      } else {
        await postRequest(apiList.createProduct, payload);
        Toast("Product added successfully", "success");
      }

      navigate("/product");
    } catch (err) {
      Toast("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate("/product")}
        sx={{ mb: 2 }}
      >
        ← Back
      </Button>

      <Box maxWidth={600} mx="auto" p={4}>
        <Typography variant="h5" gutterBottom>
          {isEditMode ? "Edit Product" : "Add New Product"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            margin="normal"
          />

          <Autocomplete
            options={categories}
            getOptionLabel={(opt) => opt.name}
            value={
              categories.find((cat) => cat._id === formData.categories[0]) ||
              null
            }
            onChange={(e, newVal) =>
              setFormData((prev) => ({
                ...prev,
                categories: newVal ? [newVal._id] : [],
              }))
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Category" margin="normal" />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : isEditMode ? (
              "Update"
            ) : (
              "Add Product"
            )}
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ProductForm;
