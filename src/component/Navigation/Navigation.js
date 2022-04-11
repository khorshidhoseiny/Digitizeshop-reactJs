import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import "./Navigation.css";
const Navigation = () => {
  const { cart } = useCart();
  const userAuth = useAuth();
  console.log(userAuth);
  return (
    <header className="MainNavigation">
      <nav>
        <ul>
          <h5 style={{ fontSize: "bold", textShadow: "1px 1px 1px #ddf184" }}>
            Nike
          </h5>
          <li>
            <NavLink to="/" activeClassName="activeLink" exact>
              Home
            </NavLink>
          </li>
        </ul>

        <ul>
          <li className="cartLink">
            <NavLink to="/cart" activeClassName="activeLink" exact>
              Cart
            </NavLink>
            <span>{cart.length}</span>
          </li>
          <li className="LoginLink">
            <NavLink
              to={userAuth ? "/profile" : "/login"}
              activeClassName="activeLink"
              exact
            >
              {userAuth ? userAuth.name : "Login"}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
