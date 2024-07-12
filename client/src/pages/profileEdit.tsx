import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import stylesDetails from "../components/profile/styles/personalDetailsFY8.module.css";
import stylesForm from "../components/profile/styles/profileEditBI1.module.css";
import { handleInputChange } from "../components/global/handleInputChange";
import { useState } from "react";
import { EditProfile } from "../typesAndInterfaces/profile/update";
import updateProfileFn from "../lib/profile/update";
import { InlineErrMsg } from "../components/global/inlineErrMsg";

// make every field temporarily required
type Props = {
  showProfile: boolean;
  handleShowProfile: (e: React.MouseEvent) => void;
  handleShowEdit: (e: React.MouseEvent) => void;
};

export const ProfileEdit = ({
  showProfile,
  handleShowEdit,
  handleShowProfile,
}: Props) => {
  const [formDetails, setFormDetails] = useState<EditProfile>({
    first_name: "",
    last_name: "",
    business_name: "",
    business_img: "",
    country_code: "",
    phone_number: "",
    whatsapp_number: "",
    state: "",
    axis: "",
    business_state: "",
    business_axis: "",
    business_category: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });

  const [about_your_organisation, setAbout_your_organisation] = useState("");
  const [
    services_your_organization_provides,
    setServices_your_organization_provides,
  ] = useState("");

  // error state
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataBody = new FormData();

    for (const key in formDetails) {
      if (key === "business_img") {
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

    // append the stand alone states
    formDataBody.append("about_your_organisation", about_your_organisation);
    formDataBody.append(
      "services_your_organization_provides",
      services_your_organization_provides
    );

    // make the API call
    try {
      const res = await updateProfileFn({ formDataBody, setErrMsg });

      // reset the form
      setFormDetails({
        first_name: "",
        last_name: "",
        business_name: "",
        business_img: "",
        country_code: "",
        phone_number: "",
        whatsapp_number: "",
        state: "",
        axis: "",
        business_state: "",
        business_axis: "",
        business_category: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        instagram: "",
      });
      setAbout_your_organisation("");
      setServices_your_organization_provides("");

      // navigate to a success page
    } catch (error) {
      console.error({ error });
      return;
    }
  }
  return (
    <>
      <div>
        <button
          onClick={handleShowProfile}
          className={
            showProfile ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          My profile
        </button>
        <button
          onClick={handleShowEdit}
          className={
            !showProfile ? stylesDetails.active : stylesDetails.nonActive
          }
        >
          Edit profile
        </button>
      </div>
      <div>
        <h4>My Profile</h4>
      </div>
      {/*form should always send values for first_name and last_name*/}
      <form onSubmit={handleSubmit} className={stylesForm.containerBI1}>
        <section className={stylesForm.flexWrapper}>
          <div>
            <label htmlFor="first_name">First name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formDetails.first_name}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
          <div>
            <label htmlFor="last_name">Last name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formDetails.last_name}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
        </section>

        <section>
          <div>
            <label htmlFor="business_name">Business name</label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              value={formDetails.business_name || undefined}
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>

          <div>
            <label htmlFor="business_img">Upload business img</label>
            <input
              type="file"
              id="business_img"
              name="business_img"
              onChange={(e) => handleInputChange(e, setFormDetails)}
            />
          </div>
        </section>

        <>
          <div className={stylesForm.header}>
            <h4>Contact information</h4>
          </div>
          <section className={stylesForm.flexWrapper}>
            <div>
              <label htmlFor="country_code">Country code</label>
              <input
                type="text"
                id="country_code"
                name="country_code"
                value={formDetails.country_code || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="phone_number">Phone number</label>
              <input
                type="text"
                id="phone_number"
                name="phone_number"
                value={formDetails.phone_number || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="whatsapp_number">Whatsapp number</label>
              <input
                type="text"
                id="whatsapp_number"
                name="whatsapp_number"
                value={formDetails.whatsapp_number || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
          </section>
        </>
        <>
          <div className={stylesForm.header}>
            <h4>Address details</h4>
          </div>
          <section className={stylesForm.flexWrapper}>
            <div>
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formDetails.state || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="axis">Axis</label>
              <input
                type="text"
                id="axis"
                name="axis"
                value={formDetails.axis || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
          </section>
        </>
        <div>
          <div className={stylesForm.header}>
            <h4>About your organization</h4>
          </div>
          <div className={stylesForm.quillArea}>
            <label htmlFor=""></label>
            <ReactQuill
              theme="snow"
              value={about_your_organisation}
              onChange={setAbout_your_organisation}
              className={stylesForm.quill}
              placeholder="About your organization"
            />
          </div>

          <div className={stylesForm.quillArea}>
            <label htmlFor=""></label>

            <ReactQuill
              theme="snow"
              value={services_your_organization_provides}
              onChange={setServices_your_organization_provides}
              className={stylesForm.quill}
              placeholder="Services Your Organization Provides, ...."
            />
          </div>

          <section className={stylesForm.flexWrapper}>
            <div>
              <label htmlFor="business_state">Business state</label>
              <input
                type="text"
                id="business_state"
                name="business_state"
                value={formDetails.business_state || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="business_axis">Business axis</label>
              <input
                type="text"
                id="business_axis"
                name="business_axis"
                value={formDetails.business_axis || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
          </section>
          <label htmlFor="business_category">Business category</label>
          <input
            type="text"
            id="business_category"
            name="business_category"
            value={formDetails.business_category || undefined}
            onChange={(e) => handleInputChange(e, setFormDetails)}
          />
        </div>
        <>
          <div className={stylesForm.header}>
            <h4>Social media</h4>
          </div>
          <section className={stylesForm.flexWrapper}>
            <div>
              <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={formDetails.facebook || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={formDetails.twitter || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="linkedin">Linkedin</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formDetails.linkedin || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
            <div>
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={formDetails.instagram || undefined}
                onChange={(e) => handleInputChange(e, setFormDetails)}
              />
            </div>
          </section>
        </>
        <div className={stylesForm.ctaArea}>
          <input
            type="button"
            value="Cancel" // value is targeted in CSS
          />
          <button>Submit</button>
        </div>
      </form>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
    </>
  );
};
