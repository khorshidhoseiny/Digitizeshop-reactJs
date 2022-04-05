import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./login.css";

const LoginForm = () => {
	const initialValues = {
		email: "",
		password: "",
	};

	const onSubmit = (values) => {
		console.log(values, "ONE SUBMIT");
		// axios
		// 	.post("http://localhost:3001/users/", values)
		// 	.then((res) => console.log(res.data))
		// 	.catch((err) => console.log(err));
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

				<button type="submit" className="btn" disabled={!formik.isValid}>
					Log In
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
