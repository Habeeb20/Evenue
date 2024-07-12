import { useState } from "react";
import forgotPwInitFn from "../../lib/users/forgotPwInit";
import { useNavigate } from "react-router-dom";
import styles from "./styles/forgotPw.module.css";

// page can't be asseciable if user is logged in. Check for token
export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await forgotPwInitFn({ email, setErrMsg });
      if (res?.message.includes("success")) {
        navigate("/enter-otp", { state: { email } });
      }
    } catch (error) {}
  }
  return (
    <div className={styles.forgotPw0}>
      {errMsg && <p className={styles.forgotPw0ErrMsg}>{errMsg}</p>}
      <h2>Enter your email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <button>Send</button>
      </form>
    </div>
  );
};
