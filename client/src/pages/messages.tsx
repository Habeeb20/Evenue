import Cookies from "js-cookie";
import { useEffect, useState } from "react";
// import { useNavigation } from "react-router-dom";
import { ErrMsg } from "../components/global/errMsg";
import { ProfileNav } from "../components/profile/nav";
import stylesDetails from "../components/profile/styles/personalDetailsFY8.module.css";
import styles from "../components/profile/styles/profileMainJS4.module.css";
import stylesNav from "../components/profile/styles/profileNavZZZ.module.css";
import getProfileFn from "../lib/profile/getProfile";
import stylesMsgDetails from "./styles/messagesET4.module.css";
import { ProfileRes } from "../typesAndInterfaces/profile/getProfile";
import getInboxFn from "../lib/chat/getInbox";
import {
  OneInboxLIInfo,
  Res4InboxLIInfo,
} from "../typesAndInterfaces/chat/res4Inbox";
import { Link } from "react-router-dom";
import authWorkerFn, { Res4AuthWorker } from "../lib/users/authWorker";

export const ProfileMessages = () => {
  const [profileRes, setProfileRes] = useState<ProfileRes>();
  const [resInbox, setResInbox] = useState<Res4InboxLIInfo>();
  const [errMsg, setErrMsg] = useState("");
  const [recipientName, setRecipientName] = useState<Res4AuthWorker>();
  // const navigate = useNavigation();

  useEffect(() => {
    let recipient_id;
    try {
      getProfileFn({ setErrMsg })
        .then((res) => {
          res && setProfileRes(res);
        })
        .then(() => {
          getInboxFn({ setErrMsg }).then((res) => {
            res && setResInbox(res);
            // .find will not work cos it returns only the first one it sees. 1st user in the list will always be returned
            recipient_id = res?.finalResult[0].find(
              (recipient) => recipient.fk_recipient_id
            )?.fk_recipient_id;

            if (recipient_id) {
              authWorkerFn({
                userId: recipient_id,
                setErrMsg,
              }).then((res) => {
                setRecipientName(res);
              });
            }
          });
        });
    } catch (error) {}
  }, []);

  const firstName = recipientName?.result[0].first_name;

  const inboxResContent = resInbox?.finalResult[0].map((inbox) => (
    <div>
      <Link to={`/chat/${inbox.id}/${firstName}`} key={inbox.id}>
        {inbox.message}
      </Link>
      <hr />
    </div>
  ));

  const totalInboxRes = resInbox?.finalResult[1].map((inbox, index) => (
    <span key={index}>{inbox.result_count}</span>
  ));

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
                  {/*TODO: Capitalize first_name preferrably from the database*/}
                  <h2>Hello, {user.first_name}</h2>
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

              <section className={stylesDetails.containerFY8}>
                <hr />
                <h3>Inbox({totalInboxRes})</h3>
                <hr />
                <div
                  className={`${stylesMsgDetails.containerET4} ${stylesMsgDetails.btnArea}`}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    columnGap: "1rem",
                  }}
                >
                  <button>Inbox({totalInboxRes})</button>
                  {/* <button>Thrash(0)</button> */}
                </div>
              </section>
              <div
                className={`${stylesMsgDetails.containerET4} ${stylesMsgDetails.inbox}`}
              >
                {inboxResContent}
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};
