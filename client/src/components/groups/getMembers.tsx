import { useEffect, useState } from "react";
import { Res4GetGroupMembers } from "../../typesAndInterfaces/groups.ts/res4GetGroupMembers";
import getMembersFn from "../../lib/groups/getMembers";
import { ErrMsg } from "../global/errMsg";
import styles from "./styles/getMembers403.module.css";
import { Link } from "react-router-dom";

export const GetMembers = ({ group_id }: { group_id: string }) => {
  const [resMembers, setResMembers] = useState<Res4GetGroupMembers>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      getMembersFn({ group_id, setErrMsg }).then((res) => {
        setResMembers(res);
      });
    } catch (error) {}
  }, [group_id]);

  const content = resMembers?.result.map((member) => (
    <div
      key={member.id}
      className={styles.card}
    >
      <div>
        <img
          src={member.img}
          alt={member.first_name + " " + member.last_name}
        />
      </div>
      <div>
        <h3>{member.first_name + " " + member.last_name}</h3>
      </div>
      <div>
        <Link to={`/chat/${member.id}/${member.first_name}`}>message</Link>
      </div>
    </div>
  ));

  return (
    <div className={styles.container403}>
      {errMsg ? <ErrMsg errMsg={errMsg} /> : content}
    </div>
  );
};
