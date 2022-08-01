import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const Accordian = ({ title, children }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <div
        onClick={() => setToggle(!toggle)}
        className="bg-white border-b pb-3 my-4  border-gray-300 flex justify-between items-center"
      >
        <p>{title}</p>
        <IoIosArrowDown className="text-xl cursor-pointer" />
      </div>
      {toggle ? <div className="w-full py-4 ">{children}</div> : ""}
    </>
  );
};

export default Accordian;
