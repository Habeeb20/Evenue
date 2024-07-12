import styles from "./styles/inlineSuccessMsgUE5.module.css";
import { useEffect, useState } from "react";

export const InlineSuccessMsg = ({ successMsg }: { successMsg: string }) => {
  // state for the error message
  const [errorMessage, setErrorMessage] = useState(successMsg); // Initialize the error message state with the received error message

  // set time out for the error message to disappear after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Code to clear the error message here
      setErrorMessage(""); // Clear the error message after 5 seconds
    }, 20000);

    return () => {
      clearTimeout(timeout);
    };
  }, [successMsg]); // Update the error message state whenever a new error message is received

  return (
    <>
      {errorMessage && (
        <div className={styles.containerUE5}>{errorMessage}</div> // Display the error message from the state
      )}
    </>
  );
};
