import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useCart } from "../Context/CartProvider";
import { FiSearch } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";

const Navigation = () => {
  const { cart } = useCart();
  const user = useAuth();
  console.log(user);
  return (
    <header className="bg-white ml-2 px-3 py-4 border-b border-gray-300 justify-between flex items-center w-full h-15">
      <ul className="flex items-center justify-center ">
        <li className="flex justify-center items-center ">
          <NavLink to="/">
            <p className="text-primary-color lg:text-3xl text-xl md:text-xl font-bold">
              Digitize
            </p>
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center justify-center ml-5 gap-x-4">
        {user ? (
          <li className="ml-1 flex flex-col justify-center items-center ">
            <Link
              to="/profile"
              className="flex justify-between flex-col items-center"
            >
              <AiOutlineUser className="text-3xl text-gray-700"/>
            </Link>
          </li>
        ) : (
          <>
            <li className="flex  border rounded-xl border-gray-200 w-auto p-1 ">
              <NavLink
                to={user ? "/profile" : "/login"}
                className="flex items-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 lg:h-8 lg:w-8 w-5"
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
                <p className="text-text-color text-sm font-semibold p-2 ">
                  ورود
                </p>
              </NavLink>
              <p className="text-gray-200 flex items-center justify-center text-lg">
                |
              </p>
              <NavLink to={user ? "/profile" : "/signup"}>
                <p className="text-text-color text-sm font-semibold p-2 ">
                  ثبت نام
                </p>
              </NavLink>
            </li>
          </>
        )}
        <p className="text-gray-400 ml-3 flex items-center justify-center text-lg">
                |
              </p>
        <li className="relative flex justify-center items-center ">
          <NavLink
            to="/cart"
            className={(navLink) => (navLink.isActive ? "activeLink" : "")}
          >
            <BsCart2 className="text-2xl h-7 w-8 text-gray-700"/>
          </NavLink>
          <span className="absolute top-0 -right-3.5 w-5 h-5 bg-primary-color rounded-md text-sm flex items-center justify-center text-white font-semibold">
            {cart.length}
          </span>
        </li>
      </ul>
    </header>
  );
};

export default Navigation;
