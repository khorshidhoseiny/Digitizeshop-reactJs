import { useFormik } from "formik";
import Input from "../../common/Input";
import * as Yup from "yup";
import "./Signup.css";
import { Link } from "react-router-dom";

const SignUpForm = () => {
	const initialValues = {
		name: "",
		email: "",
		phoneNumber: "",
		password: "",
		passwordConform: "",
	};

	const onSubmit = (values) => {
		console.log(values, "ONE SUBMIT");
		// axios
		// 	.post("http://localhost:3001/users/", values)
		// 	.then((res) => console.log(res.data))
		// 	.catch((err) => console.log(err));
	};

	const validationSchema = Yup.object({
		name: Yup.string()
			.required("وارد کردن اسم الزامی است")
			.min(4, "لطفا اسم طولانی تری بنویسید"),
		email: Yup.string()
			.email("لطفا فرمت ایمیل وارد کنید")
			.required("وارد کردن ایمیل الزامی است"),
		phoneNumber: Yup.string()
			.required("وارد کردن شماره الزامی است")
			.matches(/^[0-9]{11}$/, "شماره ای که وارد کردید اشتباه است")
			.nullable(),
		password: Yup.string()
			.required("وارد کردن پسورد الزامی است")
			.matches(
				/^[0-9A-Za-z]*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>?][0-9a-zA-Z]*$/,
				"Need one special character"
			),
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
		<div className="formContainer">
			<h1 className="signUpText">Create Account</h1>
			<form onSubmit={formik.handleSubmit}>
				<Input label="Name" name="name" formik={formik} />
				<Input label="Email" name="email" formik={formik} />
				<Input
					label="Phone Number"
					name="phoneNumber"
					formik={formik}
					type="tel"
				/>
				<Input
					label="Password"
					name="password"
					formik={formik}
					type="password"
				/>
				<Input
					label="Password Coniform"
					name="passwordConform"
					formik={formik}
					type="password"
				/>

				<Link to="/login">
					<p className="switchAccount">Already have a account ?</p>
				</Link>
				<button type="submit" className="btn" disabled={!formik.isValid}>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignUpForm;
