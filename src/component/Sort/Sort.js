import { useFilter, useFilterAction } from "../Context/FliterProvider";
import { sortOptions } from "../../Data/data";

const Sort = ({ setToggle }) => {
  const { sort } = useFilter();
  const dispatch = useFilterAction();

  const handler = (e) => {
    dispatch({ type: "SORT_PRODUCTS", payload: e.target.value });
    setToggle(false);
  };

  return sortOptions.map((item) => {
    return (
      <div className="flex items-center justify-start option" key={item.value}>
        <input
          type="radio"
          value={item.value}
          name="sort"
          className=""
          id={item.value}
          onChange={handler}
          checked={item.value === sort}
        />
        <label
          className="flex items-center  justify-start lg:justify-center py-5 cursor-pointer "
          htmlFor={item.value}
        >
          <p className=" justify-center text-xl md:text-base checked:text-red-600 items-center flex ">
            {item.label}
          </p>
        </label>
      </div>
    );
  });
};

export default Sort;
{
}
