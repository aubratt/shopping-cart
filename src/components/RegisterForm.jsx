import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterForm({ handleSuccess }) {
  const { db, setCurrentUser } = useOutletContext();

  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: "",
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

  async function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "Please fill out this field";

      if (key === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value.trim()))
          newErrors[key] = "Invalid email format";
      }

      if (key === "password" && value.length < 6)
        newErrors[key] = "Password must be at least 6 characters";

      if (key === "confirm") {
        if (formData.password !== formData.confirm)
          newErrors[key] = "Passwords must match";

        if (value.length < 6)
          newErrors[key] = "Password must be at least 6 characters";
      }
    });
    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        e.target.email.value,
        e.target.password.value,
      );

      await updateProfile(userCredential.user, {
        displayName: `${e.target.first.value} ${e.target.last.value}`,
      });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        rewards: 0,
        orders: [],
      });

      setCurrentUser({ ...auth.currentUser });
      handleSuccess();
    }
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h1>Register</h1>
        <div className="register__inputs">
          <div className="register__input">
            <input
              onChange={handleChange}
              type="text"
              name="first"
              placeholder="First Name"
            />
            {formErrors.first && (
              <p className="register__error">{formErrors.first}</p>
            )}
          </div>
          <div className="register__input">
            <input
              onChange={handleChange}
              type="text"
              name="last"
              placeholder="Last Name"
            />
            {formErrors.last && (
              <p className="register__error">{formErrors.last}</p>
            )}
          </div>
          <div className="register__input">
            <input
              onChange={handleChange}
              type="text"
              name="email"
              placeholder="Email"
            />
            {formErrors.email && (
              <p className="register__error">{formErrors.email}</p>
            )}
          </div>
          <div className="register__input">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder="Password"
            />
            {formErrors.password && (
              <p className="register__error">{formErrors.password}</p>
            )}
          </div>
          <div className="register__input">
            <input
              onChange={handleChange}
              type="password"
              name="confirm"
              placeholder="Confirm Password"
            />
            {formErrors.confirm && (
              <p className="register__error">{formErrors.confirm}</p>
            )}
          </div>
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}
