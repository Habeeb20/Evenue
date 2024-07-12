import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { useNavigation } from "react-router-dom";
import { ErrMsg } from "../components/global/errMsg";
import { ProfileNav } from "../components/profile/nav";
import { PostEvent } from "../components/profile/postEvent";
import { PostVenue } from "../components/profile/postVenue";
import stylesDetails from "../components/profile/styles/personalDetailsFY8.module.css";
import styles from "../components/profile/styles/profileMainJS4.module.css";
import stylesNav from "../components/profile/styles/profileNavZZZ.module.css";
import getProfileFn from "../lib/profile/getProfile";
import { ProfileRes } from "../typesAndInterfaces/profile/getProfile";

export const ProfilePost = () => {
  const [profileRes, setProfileRes] = useState<ProfileRes>();
  const [showProfile, setShowProfile] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  // const navigate = useNavigation();

  useEffect(() => {
    try {
      getProfileFn({ setErrMsg }).then((res) => {
        res && setProfileRes(res);
      });
    } catch (error) {}
  }, []);

  function handleShowEdit(e: React.MouseEvent) {
    e.preventDefault();
    setShowProfile(false);
  }

  function handleShowProfile(e: React.MouseEvent) {
    e.preventDefault();
    setShowProfile(true);
  }

  const token = Cookies.get("token");
  // Replace with navigate
  if (!token) {
    window.location.href = "/login";
  }

  return (
    <div className={styles.containerJS4}>
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
                  <h2>Post an Event</h2>
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
              {showProfile ? (
                <section className={stylesDetails.containerFY8}>
                  <PostEvent
                    showProfile={showProfile}
                    handleShowEdit={handleShowEdit}
                    handleShowProfile={handleShowProfile}
                    first_name={user.first_name}
                  />
                </section>
              ) : (
                <section className={stylesDetails.containerFY8}>
                  <PostVenue
                    showProfile={showProfile}
                    handleShowEdit={handleShowEdit}
                    handleShowProfile={handleShowProfile}
                    first_name={user.first_name}
                  />
                </section>
              )}
            </article>
          ))
        )}
      </section>
    </div>
  );
};
