import { useAuth } from "../Context/AuthProvider";
import Layout from "../Layout/Layout";

import { Link } from "react-router-dom";

const ProfilePage = () => {
  const user = useAuth();
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center ">
        <div className="flex justify-center flex-col items-center">
          <img
            src={process.env.PUBLIC_URL + `/assets/avatar.png`}
            alt={user.name}
            className="rounded-full flex justify-center items-center w-48"
          />
          <h3 className="text-xl font-semibold mt-5 text-primary-color ">
            {user.name}
          </h3>
        </div>
        <div className="flex flex-col gap-2 justify-start w-64 p-4 border border-gray-300 rounded-md ">
          <div className="flex flex-col items-start">
            <h6 className="font-semibold ">آدرس ایمیل :</h6>
            <p>{user.email}</p>
          </div>
          <div className="flex flex-col items-start">
            <h6 className="font-semibold">شماره تلفن :</h6>
            <p>{user.phoneNumber}</p>
          </div>
        </div>
        <Link to="/">

        <button className="bg-primary-color border-none outline-none px-3 rounded-md mt-5 py-2 text-white font">بازگشت به صفحه اصلی</button>
        </Link>
      </div>
    </Layout>
  );
};

export default ProfilePage;
