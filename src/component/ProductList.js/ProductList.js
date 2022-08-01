import { useCart, useCartAction } from "../Context/CartProvider";
import { useFilter } from "../Context/FliterProvider";
import { Link } from "react-router-dom";
import checked from "../../common/utils/checked";
import { AiTwotoneStar } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { RiRocketLine } from "react-icons/ri";
import { toast } from "react-toastify";
import numberFormat from "../../common/utils/numberFormat";

const ProductList = () => {
  const { cart } = useCart();
  const { productList } = useFilter();
  const dispatch = useCartAction();
  const addToCartHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product, size: product.size[0] });
    toast.success(`${product.name} به سبد خرید اضافه شد 😀`);
  };

  return productList.map((product) => {
    return (
      <section
        className=" items-center h-full justify-center border-gray-200 border hover:shadow-xl px-3 flex md:flex-col w-full "
        key={product.id}
      >
        <Link
          to={{
            pathname: `/${product.id}`,
            search: `id=${product.id}`,
          }}
          key={product.id}
        >
          <div className="flex flex-col justify-around ">
            <div className="flex justify-center items-end">
              <img
                className="w-[80px] md:w-[120px] flex justify-center items-center lg:w-full lg:max-w-[250px] "
                alt={product.name}
                src={product.image}
              />
            </div>
            <h2 className="text-text-color text-sm md:text-xl  text-right mt-2">
              {product.name}
            </h2>
            <div className="my-1.5 mb-3 flex justify-around">
              {product.fast && (
                <p className="flex items-center justify-center text-text-color text-sm">
                  <RiRocketLine className="text-[2rem] cursor-pointer fill-purple w-5" />
                  <span className="text-sm">امکان ارسال سریع</span>
                </p>
              )}
              <p className="flex mr-auto items-center justify-center">
                <span className="text-sm text-text-color">{product.star}</span>
                <AiTwotoneStar className="text-[2rem] fill-gold cursor-pointer w-5" />
              </p>
            </div>
          </div>
        </Link>
        {/* footer */}
        <div className="flex justify-between w-full items-center p-2">
          <div className="">
            <span className="text-text-color text-sm">قیمت به تومان</span>
            <div className=" items-center justify-between flex mt-2">
              <p className="font-bold text-sm ml-2">
                {numberFormat(product.offPrice)}
              </p>
              <p className="opacity-50 text-sm line-through ">
                {numberFormat(product.price)}
              </p>
            </div>
          </div>

          <button
            className={`${
              !checked(cart, product)
                ? "w-7 h-7 hover:CartBtn "
                : " CartBtn"
            }`}
            onClick={() => addToCartHandler(product)}
          >
            {checked(cart, product) ? (
              <FiShoppingBag className="w-5 h-5 " />
            ) : (
              <BsBagCheck className="w-5 h-5 " />
            )}
          </button>
        </div>
      </section>
    );
  });
};

export default ProductList;
