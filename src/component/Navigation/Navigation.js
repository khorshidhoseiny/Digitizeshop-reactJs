import { NavLink } from "react-router-dom";
import "./Navigation.css";
const Navigation = () => {
	return (
		<header className="MainNavigation">
			<nav>
				<ul>
					<li>
						<NavLink to="/"  activeClassName="activeLink" exact>
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/cart"  activeClassName="activeLink" exact>
							Cart
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Navigation;
