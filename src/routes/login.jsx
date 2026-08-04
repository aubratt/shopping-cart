import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LoginForm from "../components/LoginForm";

export default function Login() {
  const { setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/profile/account");
  }

  return <LoginForm handleSuccess={handleSuccess} />;
}
