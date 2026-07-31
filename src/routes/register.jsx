import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
  const navigate = useNavigate();

  function handleSuccess() {
    navigate("/");
  }

  return <RegisterForm handleSuccess={handleSuccess} />;
}
