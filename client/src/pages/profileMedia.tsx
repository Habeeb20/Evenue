import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { useNavigation } from "react-router-dom";
import { ErrMsg } from "../components/global/errMsg";
import { ProfileNav } from "../components/profile/nav";
import stylesMediaArea from "./styles/mediaAreaJNC.module.css";
import styles from "../components/profile/styles/profileMainJS4.module.css";
import stylesNav from "../components/profile/styles/profileNavZZZ.module.css";
import stylesStories from "./styles/storiesListBBD.module.css";
import getProfileFn from "../lib/profile/getProfile";
import { ProfileRes } from "../typesAndInterfaces/profile/getProfile";
import { useNavigate } from "react-router-dom";
import { StoryUploadForm } from "../components/profile/storyUploadForm";
import { StoriesList } from "../components/profile/storiesList";

export const ProfileMedia = () => {
  const [profileRes, setProfileRes] = useState<ProfileRes>();
  const [showUpload, setShowUpload] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      getProfileFn({ setErrMsg }).then((res) => {
        res && setProfileRes(res);
      });
    } catch (error) {}
  }, []);

  const token = Cookies.get("token");
  if (!token) {
    navigate("/login");
  }

  const userImg = profileRes?.profile.find((user) => user.img)?.img;

  const userFirstName = profileRes?.profile.find(
    (user) => user.first_name
  )?.first_name;

  const userLastName = profileRes?.profile.find(
    (user) => user.last_name
  )?.last_name;

  return (
    <div
      className={styles.containerJS4}
      //   onClick={() => setShowUpload(false)}
    >
      <section>
        <nav className={stylesNav.containerZZZ}>
          <ProfileNav />
        </nav>
        {errMsg ? (
          <div className={styles.errMsg}>
            <ErrMsg errMsg={errMsg} />
          </div>
        ) : (
          profileRes?.profile.map((user) => (
            <article key={user.user_id}>
              <section className={styles.header}>
                <div>
                  {/*TODO: Capitalize first_name preferrably from the database*/}
                  <h2>Hello, {user.first_name}</h2>
                  <p>
                    Joined {user.month.slice(0, 3)}.{user.year}
                  </p>
                </div>
                <div>
                  <div>
                    <img src={user.img} alt="profile" />
                  </div>
                  <div>
                    <p>{user.first_name + " " + user.last_name}</p>
                    <p>{user.email}</p>
                  </div>
                  {/* <div>
                    <img
                      src="/home/bell.svg"
                      alt=""
                    />
                  </div> */}
                </div>
              </section>

              <section className={stylesMediaArea.containerJNC}>
                <div>
                  <div>
                    <button onClick={() => setShowUpload(true)}>
                      <img src="/home/zondicons_add-outline.svg" alt="plus" />
                    </button>
                  </div>
                  <div>What's going on today?</div>
                </div>
                <div>
                  <p>Add Story</p>
                </div>
              </section>
              <section className={stylesStories.containerBBD}>
                <StoriesList />
              </section>
            </article>
          ))
        )}
      </section>
      {showUpload && (
        <StoryUploadForm
          userImg={userImg}
          userFirstName={userFirstName}
          userLastName={userLastName}
          setShowUpload={setShowUpload}
        />
      )}
    </div>
  );
};
