import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { X } from "lucide-react";

export default function Account() {
  const { currentUser, setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(null);
  const [info, setInfo] = useState({
    displayName: currentUser.displayName,
    email: currentUser.email,
    password: "",
  });
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  function handleEditInfo() {
    setEditing("info");
  }

  function handleCloseModal() {
    setEditing(null);
  }

  function handleChange(e) {
    setIncorrectPassword(false);

    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value,
    });
  }

  function saveInfo(e) {
    e.preventDefault();
    setIncorrectPassword(false);

    const auth = getAuth();
    const user = auth.currentUser;

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        info.password,
      );

      reauthenticateWithCredential(user, credential)
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: info.displayName,
          });
          updateEmail(auth.currentUser, info.email);
          handleCloseModal();
        })
        .catch((error) => {
          console.log(error.message);
          setIncorrectPassword(true);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  function handleLogOut() {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  return (
    <div className="account">
      <div className="account__info">
        <div>
          <p className="account__label">Name</p>
          <p className="account__value">{currentUser.displayName}</p>
        </div>
        <div>
          <p className="account__label">Email</p>
          <p className="account__value">{currentUser.email}</p>
        </div>
        <div className="account__actions">
          <button onClick={handleEditInfo}>Edit Information</button>
          <button>Change Password</button>
          <button onClick={handleLogOut}>Log Out</button>
          <hr />
          <button className="account__delete">Delete Account</button>
        </div>
      </div>

      {editing === "info" && (
        <div className="account__edit-info-overlay">
          <div className="account__edit-info">
            <div className="account__close-edit-info">
              <button onClick={handleCloseModal}>
                <X color="gray" />
              </button>
            </div>
            <div className="account__edit-info-heading">
              <h1>Edit Information</h1>
            </div>
            <form onSubmit={saveInfo} className="account__edit-info-form">
              <div className="account__edit-info-section">
                <label htmlFor="displayName">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="displayName"
                  value={info.displayName}
                />
              </div>
              <div className="account__edit-info-section">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={info.email}
                />
              </div>
              <div className="account__edit-info-section">
                <label htmlFor="password">Current Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={info.password}
                />
                {info.password === "" && (
                  <p className="account__incorrect-password">
                    Password required to edit information
                  </p>
                )}
                {info.password !== "" && incorrectPassword && (
                  <p className="account__incorrect-password">
                    Incorrect password
                  </p>
                )}
              </div>
              <button type="submit" className="account__edit-info-submit">
                Save Information
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
