import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function Register() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const firebaseConfig = {
      apiKey: "AIzaSyAV8Q35CTUxE8NPW4MvaMCN5miAAFLi9Qo",
      authDomain: "shopping-cart-dae1b.firebaseapp.com",
      projectId: "shopping-cart-dae1b",
      storageBucket: "shopping-cart-dae1b.firebasestorage.app",
      messagingSenderId: "472626085376",
      appId: "1:472626085376:web:7e2f7a4d4d02cf194062e5",
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    createUserWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: `${e.target.first.value} ${e.target.last.value}`,
        });

        navigate("/profile/account");
        navigate(0);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
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
