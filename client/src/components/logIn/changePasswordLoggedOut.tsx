import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import forgotPw3rdStepFn from "../../lib/users/forgotPw3rdStep";
import styles from "./styles/forgotPw.module.css";

export const ChangePasswordLoggedOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const email: string = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await forgotPw3rdStepFn({ email, newPassword, setErrMsg });
      if (res?.message.includes("success")) {
        navigate("/login");
      }
    } catch (error) {}
  }

  return (
    <div className={styles.forgotPw0}>
      {errMsg && <p className={styles.forgotPw0ErrMsg}>{errMsg}</p>}
      <div>Change password for account {email}</div>
      <h2>Enter your Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />

        <button>Send</button>
      </form>
    </div>
  );
};
