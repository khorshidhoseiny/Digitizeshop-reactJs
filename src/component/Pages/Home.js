import Layout from "../Layout/Layout";
import Sort from "../Sort/Sort";
import { sortOptions } from "../../Data/data";
import { useFilter } from "../Context/FliterProvider";
import { FaSortAmountUp } from "react-icons/fa";
import { BiSliderAlt } from "react-icons/bi";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import Filter from "../Filter/Filter";
import ProductList from "../ProductList.js/ProductList";

const HomePage = () => {
  const { sort, total } = useFilter();
  const [sortToggle, setSortToggle] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const { label } = sortOptions.find((item) => item.value === sort);

  return (
    <Layout>
      <section className="flex">
        {/* filter on labtop screen */}
        <section className="lg:block w-4/12 ml-4 hidden">
          <div className="flex flex-col gap-4  w-full mt-9 border border-secondary-color px-6 h-screen mr-4 rounded-md text-xl">
            <Filter setToggle={setFilterToggle} />
          </div>
        </section>

        <main className="w-full flex flex-col justify-start items-center">
          <section className="lg:w-3/4 w-full mr-3 flex py-4 justify-start text-xl items-center">
            <nav className="flex items-center  justify-start !w-full font-bold">
              <section
                className="relative flex lg:hidden items-center mr-5 justify-start cursor-pointer w-auto h-full ml-10 "
                onClick={() => setFilterToggle(true)}
              >
                <div className="text-2xl  cursor-pointer">
                  <BiSliderAlt className="text-2xl cursor-pointer inline-flex items-center justify-center relative" />
                  {total.length > 0 && (
                    <span className="absolute top-[1px] -left-3 w-2 h-2 rounded-full bg-red-600"></span>
                  )}
                </div>
                <p className="mr-1 text-base lg:text-xl">فیلترها</p>
              </section>
              {/* Filter in mobile & tablet screen*/}
              <section className="lg:hidden block">
                {filterToggle ? (
                  <div className="flex flex-col w-full  h-screen overflow-y-hidden inset-0 fixed bg-white !z-[999] justify-between ">
                    <div className="py-4 px-6 ">
                      <Filter setToggle={setFilterToggle} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </section>
              <section
                className={
                  "flex items-center justify-start  w-auto h-full  lg:cursor-default cursor-pointer "
                }
                onClick={() => setSortToggle(true)}
              >
                <FaSortAmountUp className=" transform  rotate-180 lg:cursor-default text-2xl cursor-pointer" />
                <p className="hidden text-xl lg:block">مرتب سازی :</p>
                <span className="lg:hidden w-24 text-base  lg:text-xl block ">
                  {label}
                </span>
              </section>
              {/* Sort in Laptop screen  */}
              <section className="lg:block hidden ">
                <div className="flex gap-x-4 text-xl">
                  <Sort setToggle={setSortToggle} />
                </div>
              </section>
              {/* Sort in mobile & tablet screen */}
              <section className="lg:hidden w-full block">
                {sortToggle ? (
                  <div className="!w-full h-full overflow-y-hidden inset-0 fixed bg-white !z-[999]">
                    <div className="flex justify-start items-center gap-x-4 w-full mt-4 mb-8 ">
                      <h3 className="text-xl mx-4 ">مرتب سازی بر اساس </h3>
                      <BiX
                        className="text-2xl cursor-pointer"
                        onClick={() => setSortToggle(false)}
                      />
                    </div>
                    {<Sort setToggle={setSortToggle} />}
                  </div>
                ) : (
                  ""
                )}
              </section>
            </nav>
          </section>
          <ProductList />
        </main>
      </section>
    </Layout>
  );
};

export default HomePage;
