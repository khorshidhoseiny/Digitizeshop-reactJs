import numberFormat from "../../common/utils/numberFormat";



const InputRange = ({ name, value, onChange, min, max, step }) => {
  return (
    <section >
      <input
        type="range"
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer  "
      />
      <label className="font-normal">
        <span> از <strong>0</strong> تومان</span>
        <span> تا <strong>{numberFormat(value)}</strong> تومان</span>
      </label>
    </section>
  );
};

export default InputRange;
