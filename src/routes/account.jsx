import { useOutletContext } from "react-router-dom";

export default function Account() {
  const { currentUser } = useOutletContext();

  return (
    <div className="account">
      <div>
        <p>Name: <span>{currentUser.displayName}</span></p>
        <p>Email: <span>{currentUser.email}</span></p>
      </div>
      <div>
        <button>Edit Account</button>
        <button>Delete Account</button>
      </div>
    </div>
  );
}
