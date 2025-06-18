import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/login";
import ProtectedRoute from "./context/ProtectedRoute";
import ProductList from "./pages/productList";
import ProductForm from "./pages/productForm";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/product" replace />} />
            <Route element={<ProtectedRoute isAllow={!!user} />}>
              <Route path="/product" element={<ProductList />} />
              <Route path="/product/create" element={<ProductForm />} />
              <Route
                path="/product/update/:id"
                element={<ProductForm isEdit={true} />}
              />
            </Route>
          </Routes>
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
