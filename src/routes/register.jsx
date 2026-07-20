import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const { auth, db, setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value,
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: `${e.target.first.value} ${e.target.last.value}`,
    });

    setCurrentUser({ ...auth.currentUser });
    navigate("/");

    await setDoc(doc(db, "users", user.uid), {
      rewards: 0,
      orders: [],
      inventory: [],
    });
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="register__form">
        <h1>Register</h1>
        <div className="register__inputs">
          <input type="text" name="first" placeholder="First Name" />
          <input type="text" name="last" placeholder="Last Name" />
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input
            type="password"
            name="confrim"
            placeholder="Confirm Password"
          />
        </div>
        <button>Register</button>
      </form>
    </div>
  );
}
