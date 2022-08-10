import { Link } from "react-router-dom";
import { useCart, useCartAction } from "../Context/CartProvider";
import Layout from "../Layout/Layout";
import { FiTruck } from "react-icons/fi";
import { VscSymbolRuler } from "react-icons/vsc";
import { AiOutlineSafety } from "react-icons/ai";
import { BiStoreAlt } from "react-icons/bi";
import numberFormat from "../../common/utils/numberFormat";
import { BiTrashAlt } from "react-icons/bi";
import CartSummery from "../CartSummery.js/CartSummery";
import Empty from "../Empty/Empty";

const CartPage = () => {
  const dispatch = useCartAction();
  const { cart } = useCart();

  const incHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const decHandler = (product) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: product });
  };

  if (!cart.length) {
    return (
      <Layout>
        <Empty
          title="سبد خرید شما خالی است!"
          description="برای مشاهده محصولات به صفحه زیر بروید:"
          titleLink="صفحه اصلی"
          to="/"
        />
      </Layout>
    );
  }

  return (
    <Layout>
      {cart.length && (
        <section className="flex flex-col gap-x-5 mx-auto lg:flex-row lg:mx-8 mt-1">
          {/* product info */}
          <section className="flex flex-col lg:w-9/12">
            {cart.map((item) => (
              <div
                className=" flex items-center lg:mt-4 w-screen  lg:w-full  justify-start py-6 border-b px-12 pb-12 lg:border rounded-lg lg:border-gray-300 gap-y-2"
                key={item.id}
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    className="w-full min-w-[100px] max-w-[200px]"
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="flex items-center  justify-between border-2 border-gray-300 text-primary-color py-1 px-4 mt-8 rounded-md">
                    <button
                      className="text-xl"
                      onClick={() => incHandler(item)}
                    >
                      +
                    </button>
                    <div className="flex flex-col items-center justify-center mx-4">
                      <p>{item.quantity}</p>
                      <span className="text-gray-400">تعداد</span>
                    </div>
                    {item.quantity === 1 ? (
                      <BiTrashAlt
                        className="text-xl cursor-pointer"
                        onClick={() => decHandler(item)}
                      />
                    ) : (
                      <button
                        className="text-2xl"
                        onClick={() => decHandler(item)}
                      >
                        -
                      </button>
                    )}
                  </div>
                </div>
                <ul className="flex w-48 gap-y-5 text-lg flex-col items-start flex-grow mr-8 text-gray-500">
                  <li className="flex items-center gap-x-2 ">
                    <h2 className="mb-8 text-text-color w-full text-lg text-right font-semibold">
                      {item.name}
                    </h2>
                  </li>
                  <li className=" flex items-center gap-x-2 ">
                    <AiOutlineSafety />
                    <span>گارانتی </span>
                  </li>
                  <li className=" flex items-center gap-x-2 ">
                    <VscSymbolRuler />
                    <span className="flex items-center">
                      سایز:
                      <span className="text-base ">{item.size}</span>
                    </span>
                  </li>
                  <li className=" flex items-center gap-x-2 ">
                    <BiStoreAlt />
                    <span>موجود در انبار</span>
                  </li>
                  <li className=" flex items-center gap-x-2 ">
                    <FiTruck />
                    <span>ارسال سریع</span>
                  </li>
                  <li className="text-primary-color text-base">
                    {numberFormat(item.price - item.offPrice)} تومان تخفیف
                  </li>
                  <li className="text-text-color font-bold text-xl mt-4 ">
                    {numberFormat(item.offPrice)} تومان
                  </li>
                </ul>
              </div>
            ))}
          </section>
          <CartSummery />
        </section>
      )}
    </Layout>
  );
};

export default CartPage;
