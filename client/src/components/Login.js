import { useContext } from "react"
import UserContext from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup"
import "../styling/authent.css"

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required")
    }),
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })
      .then(res => res.json())
      .then(user => {
        setUser(user)
        navigate("/profile")
      })
    }
  });

  return (
    <div className="auth-container">      
      <form onSubmit={formik.handleSubmit} className="auth-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="off"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error-message">{formik.errors.username}</div>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error-message">{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
        <div className="auth-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default Login