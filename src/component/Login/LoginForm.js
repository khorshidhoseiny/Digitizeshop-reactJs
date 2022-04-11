import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./login.css";
import { LoginUsers } from "../../service/LoginService";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useAuth, useAuthAction } from "../../Context/AuthProvider";
import { useQuery } from "../../hooks/useQuery";
import { useEffect } from "react";

const LoginForm = ({ history }) => {
  const query = useQuery();
  const redirect = query.get("redirect") || "/"; // اینجا رو نفهمیدم //
  const auth = useAuth();
  useEffect(() => {
    if(auth) history.push(redirect)
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
    <div className="formContainer">
      <h1 className="LoginText">Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <Input label="Email" name="email" formik={formik} />

        <Input
          label="Password"
          name="password"
          formik={formik}
          type="password"
        />
        <p>
          Don't have an account?
          {
            <Link className="signupLink" to={`/signup?redirect=${redirect}`}>
              SignUp
            </Link>
          }{" "}
        </p>
        <button type="submit" className="btn" disabled={!formik.isValid}>
          Log In
        </button>
        {error && <p style={{ color: "red", fontsize: "12px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
