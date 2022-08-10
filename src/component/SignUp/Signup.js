import { useFormik } from "formik";
import Input from "../../common/Forms/Input";
import * as Yup from "yup";
import TermsBox from "../../common/Forms/TermsBox";
import { Link,useNavigate } from "react-router-dom";
import { signUpUsers } from "../../service/signup";
import {  useState } from "react";
import { toast } from "react-toastify";
import { useAuthAction } from "../../component/Context/AuthProvider";
import { useQuery } from "../../hooks/useQuery";

const SignUpForm = ({ history }) => {
  const navigate = useNavigate();
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthAction();
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    lastName:"",
    email: "",
    phoneNumber: "",
    password: "",
    passwordConform: "",
    terms:false,
  };

  const onSubmit = async (values) => {
    const { email, password, phoneNumber, name } = values;
    const userdata = { name, email, password, phoneNumber };

    try {
      const { data } = await signUpUsers(userdata);
      console.log(data);
      setAuth(data);
      setError(null);
      toast.success(` جان خوش اومدی${name} `);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
        console.log(error);
      }
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "نام نمی تواند کمتر از سه حرف باشد.")
      .required("نام نمی تواند خالی باشد."),
    lastName: Yup.string()
      .min(3, "نام خانوادگی نمی تواند کمتر از سه حرف باشد.")
      .required("نام خانوادگی نمی تواند خالی باشد."),

    email: Yup.string()
      .email("لطفا فرمت ایمیل وارد کنید")
      .required("وارد کردن ایمیل الزامی است"),
    phoneNumber: Yup.string()
      .required("وارد کردن شماره الزامی است")
      .matches(/^[0-9]{11}$/, "شماره ای که وارد کردید اشتباه است")
      .nullable(),
    password: Yup.string()
      .required("وارد کردن پسورد الزامی است").matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "رمز شما باید حداقل دارای 8 کاراکتر , حروف کوچک و بزرگ , عدد و یک کاراکتر خاص  باشد"
      ),
    terms: Yup.boolean().oneOf(
      [true],
      "لطفا موافقت با شرایط و استفاده از خدمات را تایید نمایید."
    ).required(),
    passwordConform: Yup.string()
      .required("وارد کردن تایید پسورد لازم است")
      .oneOf([Yup.ref("password"), null], "پسورد باید یکی باشد"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <div className="container mx-auto bg-gray-200 justify-center flex-col items-center py-2 px-8 ">
      <div className="items-start w-full flex flex-col mt-8 relative">
        <h1 className="font-bold text-2xl">عضویت</h1>
        <p className="text-lg mt-2">
          لطفا برای عضویت اطلاعات این فرم را تکمیل کنید.
        </p>
      </div>
      <form onSubmit={formik.handleSubmit} className="w-full" noValidate >
          <Input
            label="نام"
            name="name"
            props={{ placeholder: "خورشید" }}
            formik={formik}
            className="flex-1"
          />
          <Input
            label=" نام خانوادگی"
            name="lastName"
            props={{ placeholder: "مرادحسینی" }}
            formik={formik}
            className="flex-1"
          />
        
        <Input label="ایمیل" name="email" formik={formik} props={{ placeholder: "example@gmail.com" }}/>
        <Input
          label="تلفن همراه"
          name="phoneNumber"
          props={{ placeholder: "*********09" }}
          formik={formik}
          type="tel"
        />
        <Input
          label="رمز عبور"
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="تایید رمز عبور"
          name="passwordConform"
          formik={formik}
          type="password"
        />
        
          <TermsBox
            formik={formik}
            name="terms"
            label="موافقت با شرایط و استفاده از خدمات"
            
          />
        

        <div className="flex items-start justify-between w-full">
          {/* <Link to={redirect}> */}

          <button 
            className="my-8 sm:text-sm bg-primary-color rounded-md disabled:bg-red-200 disabled:cursor-not-allowed disabled:text-gray-500  p-2 text-white"
            type="submit"
            disabled={!formik.isValid}
          >
            تکمیل ثبت نام
          </button>
          {/* </Link> */}
        <Link to={`/login?redirect=${redirect}`}>
          <p className="text-sm md:text-base">حساب کاربری دارید؟ ورود</p>
        </Link>
        </div>

        {error && toast.error(error)}
      </form>
    </div>
  );
};

export default SignUpForm;
