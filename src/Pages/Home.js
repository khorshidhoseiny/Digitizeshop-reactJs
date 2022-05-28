import Layout from "../Layout/Layout";
import * as data from "../Data/data";
import { useCart, useCartAction } from "../Context/CartProvider";
import { AiTwotoneStar } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { RiRocketLine } from "react-icons/ri";
import { toast } from "react-toastify";
import numberFormat from "../utils/numberFormat";

function CheckInCart(cart, product) {
  return cart.find((c) => c.id === product.id);
}
const HomePage = () => {
  const { cart } = useCart();
  const dispatch = useCartAction();

  const addToCartHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.name} به سبد خرید اضافه شد 😀`);
    
  };
  return (
    <Layout>
      <main className="w-full flex justify-center items-center">
        <section className="grid grid-cols-1 md:grid-cols-3 w-full  lg:grid-cols-4 md:gap-3 px-2 ">
          {data.products.map((product) => {
            return (
              <section
                className=" items-center justify-center border-gray-100 border-2 mt-10 hover:shadow-lg flex md:flex-col w-full "
                key={product.id}
              >
                <div className="flex justify-center items-end">
                  <img
                    className="w-[80px] md:w-[120px] flex justify-center items-center lg:w-full lg:max-w-[250px] "
                    alt={product.name}
                    src={product.image}
                  />
                </div>
                <div className="flex flex-col justify-around flex-grow">
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
                      <span className="text-sm text-text-color">
                        {product.star}
                      </span>
                      <AiTwotoneStar className="text-[2rem] fill-gold cursor-pointer w-5" />
                    </p>
                  </div>
                  {/* footer */}
                  <div className="flex justify-between items-center p-2">
                    <div className="">
                      <span className="text-text-color text-sm">
                        قیمت به تومان
                      </span>
                      <div className=" items-center justify-between flex mt-2">
                        <p className="font-bold text-sm ml-2">
                          {numberFormat(product.offPrice)}
                        </p>
                        <p className="opacity-50 text-sm line-through ">
                          {numberFormat(product.price)}
                        </p>
                      </div>
                    </div>
					<button className={`${!CheckInCart(cart, product) ? "w-7 h-7" : "  bg-primary-color w-7 h-7 flex justify-center items-center rounded-full text-white "}`}
                    onClick={() => addToCartHandler(product)}
                  >
                    {CheckInCart(cart, product) ? (
                      <FiShoppingBag className="w-5 h-5 " />
                    ) : (
                      <BsBagCheck  className="w-5 h-5 "/>
                    )}
                  </button>
                  </div>
                  
                </div>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
