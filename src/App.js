import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "../src/component/Pages/Home";
import CartPage from "../src/component/Pages/Cart";
import CartProvider from "../src/component/Context/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "../src/component/Pages//LoginPage";
import SignUpPage from "../src/component/Pages/SignUpPage";
import AuthProvider from "../src/component/Context/AuthProvider";
import ProfilePage from "../src/component/Pages/Profile";
import FilterProvider from "../src/component/Context/FliterProvider";
import ProductDetail from "../src/component/Pages/ProductDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>
              <ToastContainer />
              <Routes>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />ِ
                <Route path="/:id" element={<ProductDetail />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
