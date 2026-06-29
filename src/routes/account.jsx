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
  deleteUser,
} from "firebase/auth";
import { X } from "lucide-react";
import { field } from "firebase/firestore/pipelines";

export default function Account() {
  const { currentUser, setCurrentUser } = useOutletContext();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(null);
  const [info, setInfo] = useState({
    displayName: currentUser ? currentUser.displayName : "",
    email: currentUser ? currentUser.email : "",
    password: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [deleteFormPassword, setDeleteFormPassword] = useState("");
  const [infoErrors, setInfoErrors] = useState({
    displayName: null,
    email: null,
    password: null,
  });
  const [passwordErrors, setPasswordErrors] = useState({
    current: null,
    new: null,
    confirm: null,
  });
  const [deleteFormError, setDeleteFormError] = useState(null);

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
    }
    if (editing === "password") {
      setPasswordErrors({ ...passwordErrors, [name]: null });
      setPasswords({
        ...passwords,
        [name]: value,
      });
    }
    if (editing === "confirm-delete") {
      setDeleteFormError(null);
      setDeleteFormPassword(value);
    }
  }

  async function saveInfo(e) {
    e.preventDefault();

    const newInfoErrors = { ...infoErrors };
    const auth = getAuth();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email);

    if (!info.displayName) newInfoErrors.displayName = "This field is required";
    if (!info.email) newInfoErrors.email = "This field is required";
    if (!info.password) newInfoErrors.password = "This field is required";
    if (!emailValid) newInfoErrors.email = "Invalid email address";

    if (info.password) {
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          info.password,
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      } catch (error) {
        newInfoErrors.password = "Incorrect password";
      }
    }

    const hasErrors = Object.values(newInfoErrors).some(
      (value) => value !== null,
    );
    if (hasErrors) {
      setInfoErrors(newInfoErrors);
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName: info.displayName,
      });
      await updateEmail(auth.currentUser, info.email);
      setEditing("info-success");
      setInfo({
        displayName: info.displayName,
        email: info.email,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function savePassword(e) {
    e.preventDefault();

    const newPasswordErrors = { ...passwordErrors };
    const auth = getAuth();

    if (!passwords.current)
      newPasswordErrors.current = "This field is required";
    if (!passwords.new) newPasswordErrors.new = "This field is required";
    if (!passwords.confirm)
      newPasswordErrors.confirm = "This field is required";
    if (passwords.new && passwords.new.length < 6)
      newPasswordErrors.new = "Password must be at least 6 characters";
    if (
      passwords.new &&
      passwords.confirm &&
      passwords.new !== passwords.confirm
    )
      newPasswordErrors.confirm = "Passwords do not match";

    if (passwords.current) {
      try {
        const credential = EmailAuthProvider.credential(
          auth.currentUser.email,
          passwords.current,
        );
        await reauthenticateWithCredential(auth.currentUser, credential);
      } catch (error) {
        newPasswordErrors.current = "Incorrect password";
      }
    }

    const hasErrors = Object.values(newPasswordErrors).some(
      (value) => value !== null,
    );
    if (hasErrors) {
      setPasswordErrors(newPasswordErrors);
      return;
    }

    try {
      await updatePassword(auth.currentUser, passwords.new);
      setEditing("password-success");
      setPasswords({
        current: "",
        new: "",
        confirm: "",
      });
    } catch (error) {
      console.log(error);
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

  async function handleDelete(e) {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!deleteFormPassword) {
      setDeleteFormError("This field is required");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(
        user.email,
        deleteFormPassword,
      );
      await reauthenticateWithCredential(user, credential);
    } catch (error) {
      setDeleteFormError("Incorrect password");
      return;
    }

    try {
      await deleteUser(user);
      setEditing("delete-success");
      setDeleteFormPassword("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="account">
      {editing !== "delete-success" && (
        <>
          <h2>Information</h2>
          <div className="account__info">
            <div className="account__label-value">
              <p className="account__label">Name</p>
              <p className="account__value">
                {currentUser ? currentUser.displayName : ""}
              </p>
            </div>
            <div className="account__label-value">
              <p className="account__label">Email</p>
              <p className="account__value">
                {currentUser ? currentUser.email : ""}
              </p>
            </div>
            <div className="account__actions">
              <div className="account__actions-section">
                <button onClick={() => setEditing("info")}>
                  Edit Information
                </button>
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
                <button
                  onClick={() => setEditing("delete")}
                  className="account__danger-button">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </>
      )}

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

      {editing === "info-success" && (
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
              <p>Your account information has been udpated.</p>
            </div>
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

      {editing === "password-success" && (
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
              <p>Your password has been changed.</p>
            </div>
          </div>
        </div>
      )}

      {editing === "delete" && (
        <div className="account__edit-modal-overlay">
          <div className="account__edit-modal">
            <div className="account__close-edit-modal">
              <button
                onClick={() => {
                  setEditing(null);
                }}>
                <X color="gray" />
              </button>
            </div>
            <div className="account__edit-form-heading">
              <h1>Delete Account</h1>
            </div>
            <div className="account__edit-form">
              <div className="account__edit-form-danger-section">
                <p>Are you sure you want to delete your account?</p>
                <div className="account__danger-actions">
                  <button
                    onClick={() => setEditing("confirm-delete")}
                    className="account__danger-button">
                    Yes
                  </button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {editing === "confirm-delete" && (
        <div className="account__edit-modal-overlay">
          <div className="account__edit-modal">
            <div className="account__close-edit-modal">
              <button
                onClick={() => {
                  setEditing(null);
                  setDeleteFormPassword("");
                  setDeleteFormError(null);
                }}>
                <X color="gray" />
              </button>
            </div>
            <div className="account__edit-form-heading">
              <h1>Delete Account</h1>
            </div>
            <form onSubmit={handleDelete} className="account__edit-form">
              <div className="account__edit-form-danger-section">
                <label htmlFor="password">
                  Enter your password to delete your account:
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                />
                {deleteFormError && (
                  <p className="account__incorrect-password">
                    {deleteFormError}
                  </p>
                )}
                <div className="account__danger-actions">
                  <button type="submit" className="account__danger-button">
                    Delete
                  </button>
                  <button onClick={() => setEditing(null)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {editing === "delete-success" && (
        <div className="account__edit-modal-overlay">
          <div className="account__edit-modal">
            <div className="account__close-edit-modal">
              <button
                onClick={() => {
                  setEditing(null);
                  navigate("/login");
                }}>
                <X color="gray" />
              </button>
            </div>
            <div className="account__edit-form-heading">
              <p>Your account has been deleted.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
