import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    const auth = getAuth();

    signInWithEmailAndPassword(
      auth,
      e.target.email.value,
      e.target.password.value,
    )
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        navigate("/profile/account");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h1>Login</h1>
        <div className="login__inputs">
          <input type="text" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
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
