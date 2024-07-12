import { useState } from "react";
import styles from "./styles/storyUploadFormGDK.module.css";
import uploadStoryFn from "../../lib/story/upload";
import { handleInputChange } from "../global/handleInputChange";
import { InlineErrMsg } from "../global/inlineErrMsg";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
export const StoryUploadForm = ({
  userImg,
  userFirstName,
  userLastName,
  setShowUpload,
}: {
  userImg: string | undefined;
  userFirstName: string | undefined;
  userLastName: string | undefined;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [formDetails, setFormDetails] = useState<{
    video: string | FileList;
    [key: string]: string | FileList;
  }>({ video: "" });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataBody = new FormData();
    for (const key in formDetails) {
      if (key === "video") {
        const value = formDetails[key];
        if (value instanceof FileList) {
          const fileList = value as FileList;
          for (let i = 0; i < fileList.length; i++) {
            formDataBody.append(key, fileList[i]);
          }
        } else if (typeof value === "string") {
          formDataBody.append(key, value);
        }
      } else {
        formDataBody.append(key, String(formDetails[key]));
      }
    }

    try {
      setIsSubmitting(true);
      const res = await uploadStoryFn({ formDataBody, setErrMsg });
      if (res?.message.includes("successful")) {
        setSuccessMsg(res.message);
      }

      setIsSubmitting(false);
      // reset the form
      setFormDetails({
        video: "",
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className={styles.containerGDK}>
      <span>
        <h3>Create Post</h3>
        <p onClick={() => setShowUpload(false)}>X</p>
      </span>
      <hr />
      <div>
        <div>
          <img
            src={userImg}
            alt="gjdj"
          />
        </div>
        <div>
          <h5>
            {userFirstName} {userLastName}
          </h5>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="file"
            name="video"
            id="video"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            required
            aria-required
          />
        </div>
        <button>{isSubmitting ? "Uploading..." : "Upload"}</button>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </div>
  );
};
