import { useAuth, useAuthAction } from "../Context/AuthProvider";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";

const ProfilePage = () => {
  const user = useAuth();
  const setUser=useAuthAction();
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("authState");
    setUser(false);
    navigate("/");
    toast.success("با موفقیت خارج شدید");
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center w-full m-auto items-center ">
        <div className="flex my-4 justify-center w-full flex-col items-center">
          <Avatar sx={{ width: 100, height: 100 }}/>
          <h3 className="text-xl font-semibold mt-5 text-primary-color ">
            {user.name}
          </h3>
        </div>
        <div className="flex flex-col gap-2 justify-start max-w-2xs p-4 border border-gray-300 rounded-md ">
          <div className="flex gapx-3 items-start">
            <h6 className="font-semibold ">اسم :</h6>
            <p>{user.name}</p>
          </div>
          <div className="flex gapx-3 items-start">
            <h6 className="font-semibold ">آدرس ایمیل :</h6>
            <p>{user.email}</p>
          </div>
          <div className="flex gapx-3 items-start">
            <h6 className="font-semibold">شماره تلفن :</h6>
            <p>{user.phoneNumber}</p>
          </div>
        </div>
        <div className=" flex gap-x-5">
          <button onClick={Logout} className="border-primary-color border-2 outline-none px-3 rounded-md mt-5 py-2 text-primary-color">
            خروج از حساب کاربری
          </button>
          <Link to="/">
            <button  className="bg-primary-color border-none outline-none px-3 rounded-md mt-5 py-2 text-white">
              بازگشت به صفحه اصلی
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
