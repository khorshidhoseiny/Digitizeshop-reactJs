import { filterDelete, filterProduct, sortProduct, useFilter, useFilterAction } from "../Context/FliterProvider";
import Accordian from "../../common/Accordian/Accordian";
import InputRadio from "../../common/Accordian/InputRadio";
import InputRange from "../../common/Accordian/InputRange";
import { IoIosArrowUp } from "react-icons/io";
import { sizeOptions } from "../../Data/data";

const Filter = ({ setToggle }) => {
  const { total, productList, filterItem } = useFilter();
  const dispatch = useFilterAction();

  const onChange = (e) => {
    const values = { ...filterItem, [e.target.name]: e.target.value };
    dispatch(filterProduct(values));
    dispatch(sortProduct());
    console.log(values);
  };
  const deleteFilterHandler = () => {
    dispatch(filterDelete());
    dispatch(sortProduct());
    setToggle(false);
  };

  return (<>
  <div className="w-full flex justify-between items-center my-4">
        <h3 className="flex lg:text-2xl items-center">
          فیلترها
          {total.length > 0 && (
            <span className="text-white text-lg h-6 w-6 border-2 flex justify-center items-center rounded-md bg-primary-color text-center mr-2 border-white">
              {total.length}
            </span>
          )}
        </h3>
        <p
          className="text-blue-400 mr-4 lg:text-lg cursor-pointer"
          onClick={deleteFilterHandler}
        >
          حذف فیلترها
        </p>
      </div>
    <div className="h-[85vh] flex flex-col  w-full items-center justify-between">
      <div className="w-screen lg:w-full lg:px-1 px-4">
      <Accordian title="سایز">
        <InputRadio
          name="size"
          onChange={onChange}
          value={parseInt(filterItem.size)}
          options={sizeOptions}
        />
      </Accordian>

      <Accordian title="محدوده قیمت">
        <InputRange
          name="price"
          value={filterItem.price}
          onChange={onChange}
          step={100000}
          min={0}
          max={1000000}
        />
      </Accordian>
      </div>

      <div
        className="border-t border-secondary-color lg:hidden w-full !mt-auto font-bold flex items-center justify-between py-3 px-4 "
        onClick={() => setToggle(false)}
      >
        <p>مشاهده {productList.length} کالا</p>
        <IoIosArrowUp className="text-xl cursor-pointer" />
      </div>
    </div>
  </>
      
  );
};

export default Filter;
