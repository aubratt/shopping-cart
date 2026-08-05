import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/profile/account");
  }

  return (
    <div className="login">
      <LoginForm handleSuccess={handleSuccess} />
      <div className="login__register">
        <p>Don't have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
