import { BiErrorCircle } from "react-icons/bi";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { useRef, useState } from "react";

const Input = ({ label, name, formik, type = "text", props }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef();
  const clickHandler = () => {
    if (visible) {
      ref.current.type = "password";
    } else {
      ref.current.type = "text";
    }
    setVisible(!visible);
  };

  return (
    <div className="my-8">
      <label className="flex items-start text-text-color" htmlFor={name}>
        {label}
      </label>
      <div className=" relative w-full text-sm flex justify-center items-center">
        <input
          ref={ref}
          type={type}
          id={name}
          name={name}
          value={formik.values[name]}
          {...formik.getFieldProps({ name })}
          {...props}
          className="text-sm hover:border-2 placeholder:text-sm hover:border-primary-color"
        />
        {type === "password" && (
          <div
            className="flex justify-center visible items-center bg-white text-text-color left-3 absolute"
            onClick={clickHandler}
          >
            {visible ? (
              <MdVisibilityOff className="flex w-5 h-5 justify-center items-center" />
            ) : (
              <MdVisibility className="flex w-5 h-5 justify-center items-center" />
            )}
          </div>
        )}
      </div>
      <span
        className={`${
          formik.errors[name] && formik.touched[name]
            ? " flex  text-red-600 mt-2 gap-x-2 justify-start items-start "
            : "hidden"
        }`}
      >
        <BiErrorCircle />
        {formik.errors[name]}
      </span>
    </div>
  );
};

export default Input;
