import { useFormik } from "formik";
import Input from "../../common/Forms/Input";
import * as Yup from "yup";
import { LoginUsers } from "../../service/LoginService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth, useAuthAction } from "../../Context/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const LoginForm = ({ history }) => {
  const params = useParams();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const auth = useAuth();
  useEffect(() => {
    if (auth) history.push(redirect);
  }, [redirect]);
  console.log(redirect);
  const setAuth = useAuthAction();
  const [error, setError] = useState(null);
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values) => {
    console.log(values, "ONE SUBMIT");
    try {
      const { data } = await LoginUsers(values);
      setAuth(data);
      //   localStorage.setItem("authState", JSON.stringify(data));
      console.log(data);
      history.push(redirect);
      toast.success("با موفقیت وارد شدید !");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("لطفا فرمت ایمیل وارد کنید")
      .required("وارد کردن ایمیل الزامی است"),
    password: Yup.string().required("وارد کردن پسورد الزامی است"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="container bg-white justify-center flex-col items-center py-2 px-8 ">
      <div className="items-start w-full flex flex-col relative ">
        <h1 className="font-bold text-2xl">ورود</h1>
        <p className="text-sm mt-2">
          لطفا نام کاربری و رمز عبور خود را وارد کنید
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <Input label="آدرس ایمیل (نام کاربری)" name="email" formik={formik} />

        <Input
          label="کلمه عبور"
          name="password"
          formik={formik}
          type="password"
        />
        <div className="flex justify-between items-start">
          <button
            type="submit"
            className="my-8 sm:text-sm bg-primary-color rounded-md disabled:bg-red-200 disabled:cursor-not-allowed disabled:text-gray-500  p-2 text-white"
            disabled={!formik.isValid}
          >
            ورود
          </button>
          <p className="cursor-pointer">
          
            {
              <Link  to={`/signup?redirect=${redirect}`}>
                حساب کاربری نساخته اید؟ ثبت نام
              </Link>
            }{" "}
          </p>
        </div>
        {error && <p style={{ color: "red", fontsize: "12px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
