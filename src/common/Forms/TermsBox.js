import { BiErrorCircle } from "react-icons/bi";

const TermsBox = ({ formik, name, label }) => {
  return (
    <div className="flex flex-col items-start gap-x-2">
      <label
        htmlFor={name}
        className="flex gap-x-0 md:gap-x-2 items-center text-sm md:text-base cursor-pointer"
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          value={!formik.values[name]}
          {...formik.getFieldProps(name)}
          checked={formik.values[name]}
          className="w-5 h-5"
        />

        {label}
      </label>
      <span
        className={`${
          formik.errors[name]
            ? "flex text-red-600 mt-2 gap-x-2 justify-start items-center"
            : "hidden"
        }`}
      >
        <BiErrorCircle />
        {formik.errors[name]}
      </span>
    </div>
  );
};

export default TermsBox;
