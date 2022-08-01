import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart, useCartAction } from "../Context/CartProvider";
import numberFormat from "../../common/utils/numberFormat";

const CartSummery = () => {
  const dispatch = useCartAction();
  const { cart, total } = useCart();
  const OriginalTotalPrice = cart.length
    ? cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;

  return (
    <section className="w-full p-5 lg:w-4/12 max-h-72 justify-between lg:mt-4 border-0 lg:rounded-lg rounded-0 lg:border border-gray-300 ">
      <div className=" w-full flex justify-between items-center mb-4 ">
        <span>قیمت کالا</span>
        <p>{numberFormat(OriginalTotalPrice)}تومان</p>
      </div>
      <div className=" w-full flex justify-between items-center mb-4 ">
        <span>سود شما از این خرید </span>
        <p>{numberFormat(OriginalTotalPrice - total)}تومان</p>
      </div>
      <p className="mt-6 lg:my-6 text-sm mb-32 text-gray-500 flex items-start">
        هزینه ارسال براساس آدرس، زمان تحویل، وزن و حجم مرسوله شما محاسبه می‌شود
      </p>
      <div className="lg:border-gray-200 overflow-y-hidden w-full bg-white bottom-0 lg:my-5 justify-around fixed lg:relative flex border-t-2 border-gray-200 py-5 lg:pt-8 flex-row items-center ">
        <Link
          className="lg:mr-4 max-w-xs text-white bg-primary-color w-full text-center py-4 md:py-4 px-2 items-center justify-center rounded-lg"
          to={"/login?redirect=/"}
        >
          <button
            onClick={() => {
              dispatch({ type: "REMOVE_ALL_PRODUCT" });
              toast.success("سفارش شما ثبت شد");
            }}
          >
            ثبت سفارش
          </button>
        </Link>
        <div className="flex flex-col items-center lg:w-full  ">
          <span className="text-gray-500 mb-2 text-sm mx-2">جمع سبد خرید</span>
          <p> {total}تومان</p>
        </div>
      </div>
    </section>
  );
};

export default CartSummery;
