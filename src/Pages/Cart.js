import { Link } from "react-router-dom";
import { useCart, useCartAction } from "../Context/CartProvider";
import Layout from "../Layout/Layout";
import { FiTruck } from "react-icons/fi";
import { toast } from "react-toastify";
import { VscSymbolRuler } from "react-icons/vsc";
import { AiOutlineSafety } from "react-icons/ai";
import { BiStoreAlt } from "react-icons/bi";
import numberFormat from "../utils/numberFormat";
import { BiTrashAlt } from "react-icons/bi";


const CartPage = () => {
  const dispatch = useCartAction();
  const { cart, total } = useCart();

  if (!cart.length) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center">
          <img
            className="w-80"
            src={process.env.PUBLIC_URL + `/assets/empty-box.png`}
          />
          <h2 className="font-bold md:text-2xl"> سبد خرید شما خالی است </h2>
          <h5>برای مشاهده محصولات به لینک زیر بروید </h5>
          <Link to="/">
            <button className="my-8 sm:text-sm bg-primary-color rounded-md disabled:bg-red-200 disabled:cursor-not-allowed disabled:text-gray-500  p-2 text-white">
              صفحه اصلی
            </button>
          </Link>
        </div>
      </Layout>
    );
  }
  const incHandler = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  const decHandler = (product) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: product });
  };

  return (
    <Layout>
      {cart.length && (
        <main className="flex  justify-center bg-white">
          <div className="flex flex-col  gap-x-3 justify-between mt-5 md:flex-row">
            <section className="">
              {cart.map((item) => (
                <div
                  className=" flex items-center w-full justify-start py-8 px-12 pb-12 border rounded-lg border-gray-200 gap-y-2"
                  key={item.id}
                >
                  <div className="flex flex-col justify-center items-center">
                    <img
                      className="w-full min-w-[100px] max-w-[150px]"
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
                  <ul className="flex w-48  flex-col items-start flex-grow mr-8 text-gray-500">
                    <li className="flex items-center gap-x-2 ">
                      <h2 className="mb-8 text-text-color w-full font-semibold">
                        {item.name}
                      </h2>
                    </li>
                    <li className="mb-2 flex items-center gap-x-2 ">
                      <AiOutlineSafety />
                      <span>گارانتی </span>
                    </li>
                    <li className="mb-2 flex items-center gap-x-2 ">
                      <VscSymbolRuler />
                      <span className="flex items-center">
                        سایز:{" "}
                        <span className="text-xs md:text-base ">
                          {" "}
                          {item.size}
                        </span>
                      </span>
                    </li>
                    <li className="mb-2 flex items-center gap-x-2 ">
                      <BiStoreAlt />
                      <span>موجود در انبار</span>
                    </li>
                    <li className="mb-2 flex items-center gap-x-2 ">
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
            <CartSummery total={total} cart={cart} />
          </div>
        </main>
      )}
    </Layout>
  );
};

export default CartPage;

const CartSummery = ({ total, cart }) => {
  const OriginalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  return (
    <section className="w-full max-h-64  m-0 mt-4 border-0 p-3 md:rounded-lg rounded-0 border-t-2 md:border-2 border-gray-200 ">
      <div className=" w-full flex justify-between items-center mb-4 ">
        <span>قیمت کالا</span>
        <p>{numberFormat(OriginalTotalPrice)}تومان</p>
      </div>
      <div className=" w-full flex justify-between items-center mb-4 ">
        <span>سود شما از این خرید </span>
        <p>{numberFormat(OriginalTotalPrice - total)}تومان</p>
      </div>
      <p className="mt-4 mb-8 text-sm text-gray-500 flex items-start">
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </p>

      <div className="md:border-gray-200  flex  border-t-2 border-gray-200  bottom-0 left-0 right-0 m-0 py-2 px-4 flex-row  items-center  justify-between ">
        <Link onClick={()=>toast.success("سفارش شما با موفقیت ثبت شد!")}
          className="m-0 ml-4 max-w-xs text-white bg-primary-color w-full text-center py-4 px-6 items-start justify-start rounded-lg"
          to={"/"}
        >
          <button>
            ثبت سفارش
          </button>
        </Link>
        <div className="flex flex-col gap-x-2 items-center w-full md:flex-row ">
          <span className="text-gray-500 mb-2 text-sm p-x-2">جمع سبد خرید </span>
          <p> {total}تومان</p>
        </div>
      </div>
      
    </section>
  );
};
{

}
