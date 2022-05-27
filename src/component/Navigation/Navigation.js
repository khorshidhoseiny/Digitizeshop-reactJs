import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import { useCart } from "../../Context/CartProvider";
import "./Navigation.css";
const Navigation = () => {
  const { cart } = useCart();
  const userAuth = useAuth();
  console.log(userAuth);
  return (
    <header className=" w-full flex justify-center h-16 items-center">
      <nav className="w-full justify-between flex items-center px-2 border-b-2 pb-2 border-gray-200">
        <ul className="flex items-center justify-center">
          <li className="flex justify-center items-center mt-5">
            <NavLink to="/">
              <p className="text-primary-color sm:text-sm odd:font-semibold">
                فروشگاه
              </p>
            </NavLink>
          </li>
        </ul>
        <ul className="flex items-center justify-center mt-5 gap-x-2">
          <li className="flex border rounded-xl border-gray-200 w-auto p-1 ">
            <NavLink to={userAuth ? "/profile" : "/login"} className="flex items-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <p className="text-text-color text-sm font-semibold p-2 ">ورود</p>
            </NavLink>
            <p className="text-gray-200 flex items-center justify-center text-lg">
              |
            </p>
            <NavLink to={userAuth ? "/profile" : "/signup"}>
              <p className="text-text-color text-sm font-semibold p-2 ">
                ثبت نام
              </p>
            </NavLink>
          </li>
          <li className="relative mx-3">
            <NavLink
              to="/cart"
              className={(navLink) => (navLink.isActive ? "activeLink" : "")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-8 flex items-center relative justify-center stroke-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </NavLink>
            <span className="absolute top-1 -right-3  w-4 h-4 bg-primary-color rounded-md text-sm flex items-center justify-center text-white font-semibold">
              {cart.length}
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
