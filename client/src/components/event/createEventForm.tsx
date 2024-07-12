import { useState } from "react";
import { handleInputChange } from "../global/handleInputChange";
import { CreateEvent } from "../../typesAndInterfaces/events/createEvent";
import createEventFn from "../../lib/events/createEvent";
import styles from "./styles/createEvent83D.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { InlineSuccessMsg } from "../global/inllineSuccessMsg";
import { InlineErrMsg } from "../global/inlineErrMsg";

export const CreateEventForm = ({ first_name }: { first_name?: string }) => {
  const [formDetails, setFormDetails] = useState<CreateEvent>({
    name: "",
    location: "",
    url: "",
    category: "",
    frequency: "single",
    start_date_and_time: new Date(),
    end_date_and_time: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
    time_zone: "+1",
    imgs: "",
    price: "",
  });

  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataBody = new FormData();
    for (const key in formDetails) {
      if (key === "imgs") {
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

    // append states of external packages
    formDataBody.append("description", description);
    try {
      const res = await createEventFn({ formDataBody, setErrMsg });
      if (res.message.includes("successfully")) {
        setSuccessMsg(res.message);
      }
      //TODO: Go to the event page

      // reset the form
      setFormDetails({
        name: "",
        location: "",
        url: "",
        category: "",
        frequency: "",
        time_zone: "",
        start_date_and_time: new Date(),
        end_date_and_time: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ),
        imgs: "",
        price: "",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={
        first_name
          ? `${styles.container83D} ${styles.smallContainer} `
          : `${styles.container83D} ${styles.bigContainer}`
      }
    >
      <div>
        {/* active class with be added based on state from parent */}
        {/* <button>details</button>
        <button>tickets</button> */}
      </div>
      <div>
        <h2>Hey {first_name ?? ""} </h2>
        <p> let's set up your event...It will only take a few minutes</p>
      </div>
      <h3>Events details</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Event Name</label>
          <input
            id="name"
            name="name"
            required
            aria-required
            type="text"
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="description">Describe your event</label>
          <section className={styles.quillDiv}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              className={styles.quill}
            />
          </section>
        </div>
        <div>
          <label htmlFor="location">Location of Event</label>
          <input
            id="location"
            name="location"
            required
            aria-required
            type="text"
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="url">Use Custom URL</label>
          <input
            id="url"
            name="url"
            required
            aria-required
            type="url"
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <div>
          <label htmlFor="category">What kind of event is it?</label>
          <select
            name="category"
            id="category"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.category}
            required
            aria-required
          >
            <option value="">--Please choose an option--</option>
            <option value="meetings">Meetings</option>
            <option value="training">Training</option>
            <option value="cooperation">Cooperation</option>
            <option value="party">Party</option>▐
            <option value="engagement">Engagement</option>
          </select>
        </div>
        <div>
          <label htmlFor="start_date_and_time">Start date</label>
          <input
            type="datetime-local"
            id="start_date_and_time"
            name="start_date_and_time"
            value={formDetails.start_date_and_time.toString()}
            min={new Date().toISOString().split("T")[0] + "T00:00"}
            // max="2018-06-14T00:00"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            required
            aria-required
          />
        </div>
        <div>
          <label htmlFor="end_date_and_time">End date</label>
          <input
            type="datetime-local"
            id="end_date_and_time"
            name="end_date_and_time"
            value={formDetails.end_date_and_time.toString()}
            min={new Date().toISOString().split("T")[0] + "T00:00"}
            // max="2018-06-14T00:00"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            required
            aria-required
          />
        </div>
        <div>
          <label htmlFor="time_zone">Select time zone</label>
          <select
            name="time_zone"
            id="time_zone"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.time_zone}
            required
            aria-required
          >
            <option value="+1">UTC +1</option>
            <option value="+2">UTC +2</option>
          </select>
        </div>
        <div>
          <label htmlFor="frequency">Frequency</label>
          <select
            name="frequency"
            id="frequency"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.frequency}
            required
            aria-required
          >
            <option value="single">Single</option>
            <option value="recurring">Recurring</option>
          </select>
        </div>
        <div>
          <label htmlFor="imgs">Event Photos</label>
          <input
            type="file"
            multiple
            onChange={(e) => handleInputChange(e, setFormDetails)}
            name="imgs"
            id="imgs"
            required
            aria-required
            accept="image/jpg, image/jpeg, image/png, image/svg, image/webp, image/avif"
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            required
            aria-required
            type="number"
            onChange={(e) => handleInputChange(e, setFormDetails)}
            value={formDetails.price}
          />
        </div>
        <div>
          <input
            type="reset"
            value="Reset"
          />
          {/* button should show loading when submitting */}
          <button type="submit">Post</button>
        </div>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
      {successMsg && <InlineSuccessMsg successMsg={successMsg} />}
    </div>
  );
};
