import { Link } from "react-router-dom";
const Empty = ({ title, description, titleLink, to }) => {
  return (
    <section className="flex flex-col items-center justify-center rounded-md w-full py-14 px-4 border-2 border-secondary-color">
      <img 
     src={process.env.PUBLIC_URL + `/assets/empty-box.png`}
       alt="Empty-list" className="w-[380px] lg:w-[550px] mb-3"/>
      <h4>{title}</h4>
      <p> {description}</p>
      {to && (
        <Link to={to}>
          <button className="py-4 bg-primary-color rounded-md px-8 text-white  mt-4 font-bold ">{titleLink}</button>
        </Link>
      )}
    </section>
  );
};

export default Empty;