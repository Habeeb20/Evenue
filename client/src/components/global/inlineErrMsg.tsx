import styles from "./styles/inlineErrMsgUS6.module.css";
import { useEffect, useState } from "react";

export const InlineErrMsg = ({ errMsg }: { errMsg: string }) => {
  // state for the error message
  const [errorMessage, setErrorMessage] = useState(errMsg); // Initialize the error message state with the received error message

  // set time out for the error message to disappear after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Code to clear the error message here
      setErrorMessage(""); // Clear the error message after 5 seconds
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [errMsg]); // Update the error message state whenever a new error message is received

  return (
    <>
      {errorMessage && (
        <div className={styles.containerUS6}>{errorMessage}</div> // Display the error message from the state
      )}
    </>
  );
};
