import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./Pages/Home";
import CartPage from "./Pages/Cart";
import CartProvider from "./Context/CartProvider";
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import CheckOut from "./Pages/CheckOut";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";

function App() {
	return (
		<div className="App">
			<CartProvider>
				<ToastContainer />
				<Router>
					<Switch>
						<Route path="/cart" component={CartPage} />
						<Route path="/checkout" component={CheckOut} />
						<Route path="/signup" component={SignUpPage} />
						<Route path="/login" component={LoginPage} />
						<Route path="/" component={HomePage} />
					</Switch>
				</Router>
			</CartProvider>
		</div>
	);
}

export default App;
