import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
            <Switch>
              <Route path="/cart" component={CartPage} />
              <Route path="/checkout" component={CheckOut} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/profile" component={ProfilePage} />ِ
              <Route path="/" component={HomePage} />
            </Switch>
          </CartProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
