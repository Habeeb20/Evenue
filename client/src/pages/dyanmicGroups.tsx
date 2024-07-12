import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Res4GetOne } from "../typesAndInterfaces/groups.ts/res4GetOne";
import getOneGroupFn from "../lib/groups/res4GetOne";
import styles from "./styles/dynamicGroupKD0.module.css";
import { Posts } from "../components/groups/post";
import { ProfileRes } from "../typesAndInterfaces/profile/getProfile";
import getProfileFn from "../lib/profile/getProfile";
import { ErrMsg } from "../components/global/errMsg";
import { GroupsList } from "../components/groups/groupsList";
import { GetMembers } from "../components/groups/getMembers";
import joinGroupFn from "../lib/groups/joinGroup";
import leaveGroupFn from "../lib/groups/leaveGroup";
import { InlineErrMsg } from "../components/global/inlineErrMsg";

export const DyanmicGroups = () => {
  const [resGroups, setResGroups] = useState<Res4GetOne>({
    result: [],
  });
  const [showPosts, setShowPosts] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const [resProfile, setResProfile] = useState<ProfileRes>({
    profile: [],
  });

  const [errMsg, setErrMsg] = useState("");
  const { group_id } = useParams();

  if (!group_id) {
    throw new Error("Missing group_id");
  }

  useEffect(() => {
    try {
      getOneGroupFn({ group_id, setErrMsg })
        .then((res) => {
          res && setResGroups(res);
        })
        .then(() => {
          getProfileFn({ setErrMsg }).then((res) => {
            res && setResProfile(res);
          });
        });
    } catch (error) {}
  }, [group_id]);

  function handleShowMembers(e: React.MouseEvent) {
    e.preventDefault();
    setShowPosts(false);
  }

  function handleShowPosts(e: React.MouseEvent) {
    e.preventDefault();
    setShowPosts(true);
  }

  const userImg = resProfile.profile.find((user) => user.img)?.img;
  const userFirstname = resProfile.profile.find(
    (user) => user.first_name
  )?.first_name;
  const isMember = resGroups.result.find(
    (user) => user.user_has_joined
  )?.user_has_joined;

  const [userJoined, setUserJoined] = useState(isMember ? 1 : 0);

  const handleMembershipToggle = async () => {
    try {
      const newMemberState = userJoined === 1 ? 0 : 1; // Toggle between 1 and 0
      setUserJoined(newMemberState);

      const response = await (newMemberState === 1
        ? joinGroupFn
        : leaveGroupFn)({ group_id, setErrMsg });

      if (response?.message.includes("success")) {
        setSuccessMsg(response.message);
      } else {
        const newLikeState = userJoined === 1 ? 0 : 1;
        setUserJoined(newLikeState); // Revert UI on failure
      }
    } catch (error) {
      console.error(error);
      const newLikeState = userJoined === 1 ? 0 : 1;
      setUserJoined(newLikeState);
    }
  };

  return (
    <>
      {resGroups.result.map((group) => (
        <div
          key={group.id}
          className={styles.containerKD0}
        >
          <div>
            <img
              src={group.logo}
              alt={group.name}
            />
          </div>
          <div>
            <div>
              <button
                onClick={handleShowPosts}
                className={showPosts ? "" : styles.inactive}
              >
                Post
              </button>
              <button
                onClick={handleShowMembers}
                className={showPosts ? styles.inactive : ""}
              >
                Members
              </button>
            </div>
            <div>
              <span onClick={handleMembershipToggle}>
                {userJoined ? <button>Leave</button> : <button>Join</button>}
              </span>
            </div>
          </div>
          <section>
            <div>
              {showPosts ? (
                <div>
                  <section>
                    {userImg && (
                      <img
                        src={userImg}
                        alt={userFirstname ?? "User"}
                        className={styles.userImg}
                      />
                    )}
                  </section>
                  <div>
                    <Posts group_id={group_id} />
                  </div>
                </div>
              ) : (
                <div>
                  <GetMembers group_id={group_id} />
                </div>
              )}
            </div>

            <div>
              <div>
                <h3>About Group</h3>
                <p>{group.about}</p>
              </div>
              <div>
                <h3>Other Groups</h3>
                <div>
                  <GroupsList
                    startNo={0}
                    endNo={4}
                  />
                </div>
              </div>
            </div>
          </section>
          {errMsg && <InlineErrMsg errMsg={errMsg} />}
        </div>
      ))}
    </>
  );
};
