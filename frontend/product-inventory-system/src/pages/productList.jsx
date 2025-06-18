import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Autocomplete,
  Card,
  CardContent,
  Chip,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import { deleteRequest, getRequest, postRequest } from "../api/apiServices";
import { apiList } from "../api/api";
import Toast from "../utils/toast";
import { useNavigate } from "react-router-dom"; // For navigation

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    selectedCategories: [],
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Router for navigation

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [pagination.currentPage, filters]);

  const loadCategories = async () => {
    try {
      const response = await getRequest(apiList.getAllCategory);
      setCategories(response.data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const payload = {
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
        ...(filters.search && { search: filters.search }),
        ...(filters.selectedCategories.length > 0 && {
          categories: filters.selectedCategories.join(","),
        }),
      };

      const response = await postRequest(apiList.getAllProduct, payload);
      setProducts(response.data.products || []);
      setPagination((prev) => ({
        ...prev,
        totalPages: response.data.totalPages || 1,
        totalItems: response.data.totalItems || 0,
      }));
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await deleteRequest(apiList.deleteProduct(productId));
      Toast("Product deleted successfully!", "success");
      loadProducts();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const getCategoryNameById = (id) => {
    const cat = categories.find((c) => c._id === id);
    return cat?.name || "Unknown";
  };

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Product Listing</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/product/create")}
        >
          + New Product
        </Button>
      </Box>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search by name"
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              search: e.target.value,
            }))
          }
        />

        <Autocomplete
          multiple
          options={categories}
          getOptionLabel={(option) => option.name}
          value={categories.filter((c) =>
            filters.selectedCategories.includes(c._id)
          )}
          onChange={(e, newVal) =>
            setFilters((prev) => ({
              ...prev,
              selectedCategories: newVal.map((cat) => cat._id),
            }))
          }
          renderInput={(params) => (
            <TextField {...params} label="Filter by categories" />
          )}
          sx={{ minWidth: 250 }}
        />
      </Box>

      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} md={6} lg={4} key={product._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{product.name}</Typography>
                <Box my={1}>
                  <Chip
                    label={getCategoryNameById(product.categories)}
                    color="primary"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Added on: {new Date(product.createdAt).toLocaleDateString()}
                </Typography>

                <Box display="flex" gap={1} mt={2}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/product/update/${product._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pagination.totalPages > 1 && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(e, val) =>
              setPagination((prev) => ({ ...prev, currentPage: val }))
            }
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
