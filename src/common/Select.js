const Select = ({ title, options, onChange, value }) => {
  return (
    <div className="flex flex-col items-start justify-between w-full text-2xl my-8 ">
      <span className="mb-4">{title}</span>
      <section className="flex items-center justify-start flex-wrap">
        {options.map((item) => {
          return (
            <div className="option-select" key={item.value}>
              <input
                type="radio"
                id={item.value}
                name="size"
                value={item.value}
                onChange={onChange}
                className="hidden"
                checked={parseInt(value) === parseInt(item.value)}
              />
              <label
                className="inline-flex text-sm items-center justify-center bg-white border-2 border-secondary-color w-9 h-9 rounded-full cursor-pointer ml-4 "
                htmlFor={item.value}
              >
                {item.value}
              </label>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Select;
