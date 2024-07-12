import styles from "./styles/errMsg.module.css";
import { Link } from "react-router-dom";

export const ErrMsg = ({ errMsg }: { errMsg: string }) => {
  return (
    <div className={styles.errMsgAE3}>
      <p>{errMsg}.</p>
      <p>
        Go <Link to="/">home</Link>
      </p>
    </div>
  );
};
