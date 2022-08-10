import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import { useCart } from "../Context/CartProvider";
import { HiOutlineLogin } from "react-icons/hi";
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
            <p className="text-primary-color mr-5 lg:text-3xl text-2xl font-bold">
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
            <li className="flex mr-3  border rounded-xl border-gray-200 w-auto p-1 ">
              <NavLink
                to={user ? "/profile" : "/login"}
                className="flex items-center "
              >
                <HiOutlineLogin/>
                <p className="text-text-color text-xs lg:text-sm font-semibold p-2 ">
                  ورود
                </p>
              </NavLink>
              <p className="text-gray-200 flex items-center justify-center text-lg">
                |
              </p>
              <NavLink to={user ? "/profile" : "/signup"}>
                <p className="text-text-color text-xs lg:text-sm font-semibold p-2 ">
                  ثبت نام
                </p>
              </NavLink>
            </li>
          </>
        )}
        <p className="text-gray-400 lg:ml-3 ml-1 flex items-center justify-center text-lg">
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
