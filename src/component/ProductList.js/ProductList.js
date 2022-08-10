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
import Empty from "../Empty/Empty";

const ProductList = () => {
  const { cart } = useCart();
  const { productList } = useFilter();
  const dispatch = useCartAction();
  const addToCartHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product, size: product.size[0] });
    toast.success(`${product.name} به سبد خرید اضافه شد 😀`);
  };

  return  <section className="grid grid-cols-1 md:grid-cols-2  w-full lg:grid-cols-3 lg:px-7 ">
    {productList.length === 0 ? (
    <Empty
      title="نتیجه ای یافت نشد!"
      description="ترکیب این فیلتر ها با هیچ کالایی هم خوانی ندارد."
    />
  ) : (
    productList.map((product) => {
      return (
        <Link
            to={{
              pathname: `/${product.id}`,
              search: `id=${product.id}`,
            }}
            key={product.id}
          >
        <section
          className=" items-center h-full lg:flex-col md:flex-col justify-center border-gray-200 border hover:shadow-xl flex w-full "
          key={product.id}
        >
          
            <div className="flex justify-center items-center">
              <img
                className="w-52 flex justify-center items-center lg:w-full lg:max-w-[250px] md:w-[250px] "
                alt={product.name}
                src={product.image}
              />
            </div>
            {/* description */}
            <div className="flex flex-col w-full justify-center flex-grow pr-4 px-1 md:px-4 ">
               {/* Header */}
              <div className="h-24 ">
                <h2 className="text-text-color text-lg md:text-xl font-semibold md:font-bold text-right mt-2">
                  {product.name}
                </h2>
              </div>
              {/* Body */}
              <div className="my-1.5 flex w-full items-center justify-between">
              {product.fast && (
                <p className="flex items-center justify-center text-text-color text-sm">
                  <RiRocketLine className="text-3xl cursor-pointer fill-purple w-6" />
                  <span className="text-sm md:text-base">امکان ارسال سریع</span>
                </p>
              )}
              <p className="flex mr-auto items-center justify-center">
                <span className="text-sm text-text-color">{product.star}</span>
                <AiTwotoneStar className="text-3xl fill-gold cursor-pointer w-5" />
              </p>
              </div>
            
          {/* footer */}
          <div className="flex justify-between w-full items-center p-2">
            <div >
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
                !checked(cart, product) ? "w-7 h-7 hover:CartBtn " : " CartBtn"
              }`}
              onClick={(e) => {e.preventDefault();
                addToCartHandler(product)}}
            >
              {checked(cart, product) ? (
                <FiShoppingBag className="w-5 h-5 " />
              ) : (
                <BsBagCheck className="w-5 h-5 " />
              )}
            </button>
          </div>
          </div>         
        </section>
          </Link>
      );
    })
  )}
  </section>

   
};

export default ProductList;
