import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  getAuth,
  signOut,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
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
  const [infoErrors, setInfoErrors] = useState({
    displayName: null,
    email: null,
    password: null,
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    current: null,
    new: null,
    confirm: null,
  });

  const errorMessages = {
    "auth/invalid-email": "Invalid email address",
    "auth/invalid-credential": "Incorrect password",
    "auth/invalid-password": "Incorrect password",
    "auth/missing-password": "This field is required",
    "auth/password-does-not-meet-requirements":
      "Password must be at least 6 characters",
    "auth/weak-password": "Password must be at least 6 characters",
    "auth/wrong-password": "Incorrect password",
    "password-mismatch": "Passwords do not match",
  };

  function handleChange(e) {
    const { name, value } = e.target;

    if (editing === "info") {
      setInfoErrors({ ...infoErrors, [name]: null });
      setInfo({
        ...info,
        [name]: value,
      });
    } else if (editing === "password") {
      setPasswordErrors({ ...passwordErrors, [name]: null });
      setPasswords({
        ...passwords,
        [name]: value,
      });
    }
  }

  function saveInfo(e) {
    e.preventDefault();

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
          setEditing(null);
        })
        .catch((error) => {
          console.log(error.message);
          setIncorrectPassword(true);
        });
    } catch (error) {
      console.log(error.message);
    }
  }

  function savePassword(e) {
    e.preventDefault();

    const updatedPasswordErrors = { ...passwordErrors };

    if (passwords.new !== passwords.confirm) {
      updatedPasswordErrors.confirm = "Passwords do not match";
    }
    Object.entries(passwords).forEach(([field, value]) => {
      if (value === "") {
        updatedPasswordErrors[field] = "This field is required";
      }
    });
    if (
      Object.entries(updatedPasswordErrors).some(
        ([field, value]) => value !== null,
      )
    ) {
      setPasswordErrors(updatedPasswordErrors);
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      passwords.current,
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, passwords.new)
          .then(() => {
            setEditing(null);
            setPasswords({
              current: "",
              new: "",
              confirm: "",
            });
            setPasswordErrors({
              current: null,
              new: null,
              confirm: null,
            });
          })
          .catch((error) => {
            updatedPasswordErrors.new = errorMessages[error.code];
            setPasswordErrors(updatedPasswordErrors);
          });
      })
      .catch((error) => {
        updatedPasswordErrors.current = errorMessages[error.code];
        setPasswordErrors(updatedPasswordErrors);
      });
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
      <h2>Information</h2>
      <div className="account__info">
        <div className="account__label-value">
          <p className="account__label">Name</p>
          <p className="account__value">{currentUser.displayName}</p>
        </div>
        <div className="account__label-value">
          <p className="account__label">Email</p>
          <p className="account__value">{currentUser.email}</p>
        </div>
        <div className="account__actions">
          <div className="account__actions-section">
            <button onClick={() => setEditing("info")}>Edit Information</button>
            <button onClick={() => setEditing("password")}>
              Change Password
            </button>
          </div>
          <hr />
          <div className="account__actions-section">
            <button onClick={handleLogOut}>Log Out</button>
          </div>
          <hr />
          <div className="account__actions-section">
            <button className="account__delete">Delete Account</button>
          </div>
        </div>
      </div>

      {editing === "info" && (
        <div className="account__edit-modal-overlay">
          <div className="account__edit-modal">
            <div className="account__close-edit-modal">
              <button
                onClick={() => {
                  setEditing(null);
                  setInfo({
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    password: "",
                  });
                  setInfoErrors({
                    displayName: null,
                    email: null,
                    password: null,
                  });
                }}>
                <X color="gray" />
              </button>
            </div>
            <div className="account__edit-form-heading">
              <h1>Edit Information</h1>
            </div>
            <form onSubmit={saveInfo} className="account__edit-form">
              <div className="account__edit-form-section">
                <label htmlFor="displayName">Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="displayName"
                  value={info.displayName}
                />
              </div>
              <div className="account__edit-form-section">
                <label htmlFor="email">Email</label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  value={info.email}
                />
              </div>
              <div className="account__edit-form-section">
                <label htmlFor="password">Current Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  value={info.password}
                />
                {infoErrors.password && (
                  <p className="account__incorrect-password">
                    {infoErrors.password}
                  </p>
                )}
              </div>
              <button type="submit" className="account__edit-form-submit">
                Save Information
              </button>
            </form>
          </div>
        </div>
      )}

      {editing === "password" && (
        <div className="account__edit-modal-overlay">
          <div className="account__edit-modal">
            <div className="account__close-edit-modal">
              <button
                onClick={() => {
                  setEditing(null);
                  setPasswords({
                    current: "",
                    new: "",
                    confirm: "",
                  });
                  setPasswordErrors({
                    current: null,
                    new: null,
                    confirm: null,
                  });
                }}>
                <X color="gray" />
              </button>
            </div>
            <div className="account__edit-form-heading">
              <h1>Change Password</h1>
            </div>
            <form onSubmit={savePassword} className="account__edit-form">
              <div className="account__edit-form-section">
                <label htmlFor="current">Current Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="current"
                  value={passwords.current}
                />
                {passwordErrors.current && (
                  <p className="account__incorrect-password">
                    {passwordErrors.current}
                  </p>
                )}
              </div>
              <div className="account__edit-form-section">
                <label htmlFor="new">New Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="new"
                  value={passwords.new}
                />
                {passwordErrors.new && (
                  <p className="account__incorrect-password">
                    {passwordErrors.new}
                  </p>
                )}
              </div>
              <div className="account__edit-form-section">
                <label htmlFor="confirm">Confirm New Password</label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="confirm"
                  value={passwords.confirm}
                />
                {passwordErrors.confirm && (
                  <p className="account__incorrect-password">
                    {passwordErrors.confirm}
                  </p>
                )}
              </div>
              <button type="submit" className="account__edit-form-submit">
                Save Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
