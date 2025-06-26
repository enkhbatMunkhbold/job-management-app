import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import * as Yup from "yup"
import "../styling/authent.css";

const SignUp = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      passwordConfirmation: Yup.string()
        .required("Password confirmation is required")
        .oneOf([Yup.ref('password')], "Passwords must match")
    }),
    onSubmit: (values) => {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          password_confirmation: values.passwordConfirmation
        })
      })
      .then(res => res.json())
      .then(user => {
        setUser(user)
        navigate("/profile")
      })
    }
  })

  return (
    <div className="auth-container">
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <p style={{ color: "red" }}>{formik.errors.username}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            autoComplete="new-password"
          />
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        </div>
        <div className="form-group">
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password Confirmation"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            autoComplete="new-password"
          />
          <p style={{ color: "red" }}>{formik.errors.passwordConfirmation}</p>
        </div>
        <button type="submit">Sign Up</button>
        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp; 