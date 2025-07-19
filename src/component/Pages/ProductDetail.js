import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart, useCartAction } from "../Context/CartProvider";
import { products } from "../../Data/data";
import queryString from "query-string";
import { toast } from "react-toastify";
import Layout from "../Layout/Layout";
import { BiStoreAlt } from "react-icons/bi";
import { AiTwotoneStar } from "react-icons/ai";
import { AiOutlineSafety } from "react-icons/ai";
import { VscSymbolRuler } from "react-icons/vsc";
import { RiRocketLine } from "react-icons/ri";
import Select from "../../common/Select";
import numberFormat from "../../common/utils/numberFormat";
import checked from "../../common/utils/checked";

const ProductDetail = () => {
  const { search } = useLocation();
  const parsed = queryString.parse(search);
  const [state] = products.filter((item) => item.id === parseInt(parsed.id));
  const options = state.size.map((item) => {
    return { value: item };
  });
  const [value, setValue] = useState(options[0].value);
  const { cart } = useCart();
  const dispatch = useCartAction();
  return (
    <Layout>
      <section className="flex gap-x-4 lg:mx-8 mt-5 flex-col lg:flex-row">
        {/* Product Detail */}
        <section className="w-full lg:w-9/12  border-2 border-gray-200 rounded-lg py-5 px-4 ">
          <div className="w-full flex justify-between items-center ">
            <h3 className="text-lg lg:text-2xl md:text-xl font font-semibold mb-3 text-black">
              {state.name}
            </h3>
            <Link
              to={parsed.back ? parsed.back : "/"}
              className="text-base  text-blue-300"
            >
              برگشت
            </Link>
          </div>
          <section className="flex flex-col lg:gap-x-9 lg:justify-between w-full lg:flex-row ">
            <img
              src={state.image}
              className="mx-auto lg:mr-0 mt-2 w-full max-w-[350px]"
            />
            <div className="w-full flex flex-col items-start mr-4 ">
              <Select
                options={options}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                title={`اندازه ${value}`}
              />
              <p className="flex items-center justify-center">
                <span>{state.star}</span>
                <AiTwotoneStar className="text-2xl w-full cursor-default mr-2 text-gold" />
              </p>
              <ul className="description">
                <li>
                  <h3 className="text-md">ویژگی ها</h3>
                </li>
                <li>
                  <p>
                    کفی : <span className="text-sm">قابل تعویض</span>
                  </p>
                </li>
                <li>
                  <p>
                    نحوه بسته شدن کفش : <span className="text-sm">یکسره</span>
                  </p>
                </li>
                <li>
                  <p>
                    ویژگی‌های زیره :
                    <span className="text-sm">
                      انعطاف پذیر، مقاوم در برابر سایش
                    </span>
                  </p>
                </li>
                <li>
                  <p>
                    ویژگی‌های تخصصی کفش :{" "}
                    <span className="text-sm">قابلیت گردش هوا</span>
                  </p>
                </li>
              </ul>
            </div>
          </section>
        </section>
        {/* 'Cart Summery' */}
        <section className="w-full lg:w-3/12 flex flex-col items-start justify-start border-2 border-gray-200 rounded-lg  p-4 lg:py-1 ">
          <ul className="info">
            <li>
              <h2 className="font-bold">فروشنده : دیجی تایز</h2>
            </li>
            <li>
              <AiOutlineSafety className="icons" />
              <span className="text-sm">گارانتی سلامت فیزیکی کالا</span>
            </li>
            <li>
              <VscSymbolRuler className="icons" />
              <span className="text-sm">{state.size.join(` - `)}</span>
            </li>
            <li>
              <BiStoreAlt className="icons" />
              <span className="text-sm">موجود در انبار</span>
            </li>
            {state.fast && (
              <li>
                <RiRocketLine className="icons text-purple" />
                <span className="text-sm">ارسال سریع</span>
              </li>
            )}
            <li className="!text-primary-color">
              <p> {numberFormat(state.price - state.offPrice)} تومان تخفیف </p>
            </li>
          </ul>
          <div className="border-t-2 border-gray-200 w-full py-3 px-6 mx-auto flex items-center justify-between flex-row lg:flex-col fixed lg:relative left-0 bottom-0 bg-white ">
            <div className="flex flex-col w-full justify-end text-lg md:w-auto lg:justify-between  lg:mt-3 lg:flex-row lg:gap-x-3 lg:items-center ">
              <span className="text-gray-600  text-sm lg:text-base  ">
                قیمت با تخفیف
              </span>
              <p className="text-sm lg:text-base">
                {numberFormat(state.offPrice)} تومان
              </p>
            </div>

            {checked(cart, state) ? (
              <button
                className="cartSummeryFooterBtn"
                type="button"
                onClick={() => {
                  dispatch({ type: "REMOVE_PRODUCT", payload: state });
                  toast.success(`${state.name} از سبد خرید حذف شد😀`);
                }}
              >
                حذف از سبد خرید
              </button>
            ) : (
              <button
                type="button"
                className="cartSummeryFooterBtn"
                onClick={() => {
                  dispatch({
                    type: "ADD_TO_CART",
                    payload: state,
                    size: value,
                  });
                  toast.success(`${state.name} به سبد خرید اضافه شد 😀`);
                }}
              >
                اضافه به سبد خرید
              </button>
            )}
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default ProductDetail;
