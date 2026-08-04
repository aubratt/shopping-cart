import { Link, useOutletContext } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function LoginForm({ handleSuccess }) {
  const { setCurrentUser } = useOutletContext();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (formErrors[e.target.name] && e.target.value.trim())
      setFormErrors({ ...formErrors, [e.target.name]: null });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value,
    )
      .then((userCredential) => {
        setCurrentUser(userCredential.user);
        handleSuccess();
      })
      .catch((error) => {
        const newErrors = {};

        if (error.message.includes("email")) {
          newErrors["email"] = "Invalid email";
        }
        if (error.message.includes("credential")) {
          newErrors["password"] = "Invalid password";
        }

        setFormErrors(newErrors);
      });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h1>Login</h1>
        <div className="login__inputs">
          <div className="login__input">
            <input type="text" name="email" placeholder="Email" />
            {formErrors.email && <p className="login__error">Invalid email</p>}
          </div>
          <div className="login__input">
            <input type="password" name="password" placeholder="Password" />
            {formErrors.password && (
              <p className="login__error">Invalid password</p>
            )}
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="login__register">
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
