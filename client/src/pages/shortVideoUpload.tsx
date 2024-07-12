import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddVideoBody } from "../typesAndInterfaces/shortVideos/addVideoBody";
import { handleInputChange } from "../components/global/handleInputChange";
import uploadShortVideoFn from "../lib/shortVideos/upload";
import { InlineErrMsg } from "../components/global/inlineErrMsg";
import { InlineSuccessMsg } from "../components/global/inllineSuccessMsg";
import styles from "./styles/shortVideoUpload9XW.module.css";

export const ShortVideoUploadForm = () => {
  const [formDetails, setFormDetails] = useState<AddVideoBody>({
    video: "",
    description: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

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
      const res = await uploadShortVideoFn({ formDataBody, setErrMsg });
      if (res?.message.includes("successfully")) {
        setSuccessMsg(res.message);
      }
      //TODO: Go to the short video page

      // reset the form
      setFormDetails({
        video: "",
        description: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form9XW}>
        <h1>Upload Short Video</h1>
        <div>
          <label htmlFor="video"></label>
          <input
            type="file"
            name="video"
            id="video"
            accept="video/mp4, video/webm"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            required
            aria-required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={formDetails.description}
            required
            aria-required
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <button>Post</button>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </>
  );
};
