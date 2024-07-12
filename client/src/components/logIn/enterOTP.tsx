import { useLocation } from "react-router-dom";
import styles from "./styles/forgotPw.module.css";
import { useEffect, useState } from "react";
import forgotPw2ndStepFn from "../../lib/users/forgotPw2ndStep";
import { useNavigate } from "react-router-dom";

export const EnterOTP = () => {
  // retrieve email from the navigation state
  const location = useLocation();
  const [code, setCode] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const email: string = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await forgotPw2ndStepFn({ email, code, setErrMsg });
      if (res?.message.includes("success")) {
        navigate("/changed-pw-logged-out", { state: { email } });
      }
    } catch (error) {}
  }

  return (
    <div className={styles.forgotPw0}>
      {errMsg && <p className={styles.forgotPw0ErrMsg}>{errMsg}</p>}
      <h2>Enter OTP</h2>
      <p>
        An email has been sent to your email address if your account exists.
        Check your inbox and spam folders{" "}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Code</label>
        <input
          type="text"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
