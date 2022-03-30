import { NavLink } from "react-router-dom";
import { useCart } from "../../Context/CartProvider";
import "./Navigation.css";
const Navigation = () => {
	const { cart } = useCart();
	return (
		<header className="MainNavigation">
			<nav>
				<ul>
					<li>
						<NavLink to="/" activeClassName="activeLink" exact>
							Home
						</NavLink>
					</li>
					<li className="cartLink">
						<NavLink to="/cart" activeClassName="activeLink" exact>
							Cart
						</NavLink>
						<span>{cart.length}</span>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
