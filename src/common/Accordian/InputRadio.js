const InputRadio = ({ options, name, value, onChange }) => {
  return options.map((item) => {
    
    return (
      <div className="flex items-center justify-start" key={item.value}>
        <input
          type="radio"
          name={name}
          id={item.value}
          value={item.value}
          onChange={onChange}
          className="ml-2 appearance-none border border-gray-400 checked:bg-primary-color mr-4 w-auto rounded-md"
          checked={item.value === parseInt(value)}
        />
        
        <label
          className="flex items-center  justify-start lg:justify-center  py-5 cursor-pointer"
          htmlFor={item.value}
        >
          <p className="justify-center items-center flex">{item.label}</p>
        </label>
      </div>
    );
  });
};

export default InputRadio;
