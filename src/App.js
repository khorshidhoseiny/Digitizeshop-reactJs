import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import CartPage from "./Pages/Cart";
import CartProvider from "./Context/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOut from "./Pages/CheckOut";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import AuthProvider from "./Context/AuthProvider";
import ProfilePage from "./Pages/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <CartProvider>
            <ToastContainer />
            <Routes>
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/checkout" element={<CheckOut/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignUpPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />ِ
              <Route path="/" element={<HomePage/>} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
