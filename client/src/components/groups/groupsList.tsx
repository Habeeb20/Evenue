import { useEffect, useState } from "react";
import getGroupsLFn from "../../lib/groups/res4GroupsList";
import { Res4GetListLInfo } from "../../typesAndInterfaces/groups.ts/res4GetListLInfo";
import { ErrMsg } from "../global/errMsg";
import { Card } from "./card";

export const GroupsList = ({
  startNo,
  endNo,
}: {
  startNo?: number;
  endNo?: number;
}) => {
  const [resGroups, setResGroups] = useState<Res4GetListLInfo>();
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    try {
      getGroupsLFn({ setErrMsg }).then((res) => {
        setResGroups(res);
      });
    } catch (error) {}
  }, []);

  let content;

  if (!startNo && !endNo) {
    content = resGroups?.result.map((group) => (
      <Card
        key={group.id}
        {...group}
      />
    ));
  } else {
    content = resGroups?.result.slice(startNo, endNo).map((group) => (
      <Card
        key={group.id}
        {...group}
      />
    ));
  }

  return <>{errMsg ? <ErrMsg errMsg={errMsg} /> : content}</>;
};
