import { useState } from "react";
import { Link } from "react-router-dom";
import { ErrMsg } from "../components/global/errMsg";
import { Card } from "../components/groups/card";
import { GroupsList } from "../components/groups/groupsList";
import { Search } from "../components/groups/search";
import addSearchFn from "../lib/groups/addSearch";
import { Res4GetListLInfo } from "../typesAndInterfaces/groups.ts/res4GetListLInfo";
import styles from "./styles/groups89J.module.css";
import { Helmet } from "react-helmet";

export const Groups = () => {
  const [resGroups, setResGroups] = useState<Res4GetListLInfo>({
    result: [],
  });
  const [group_name, setGroup_name] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await addSearchFn({
        group_name,
        setErrMsg,
      });

      res && setResGroups(res);
      setErrMsg("");
    } catch (error) {}
  }

  const content = resGroups?.result.map((group) => (
    <Card key={group.id} {...group} />
  ));
  return (
    <div className={styles.container89J}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Groups</title>
        <link rel="canonical" href="https://evenue.ng/groups" />
      </Helmet>
      <section>
        <Search setGroup_name={setGroup_name} handleSearch={handleSearch} />
      </section>
      <section>
        <Link to="/groups/create">Create group</Link>
      </section>
      {resGroups.result.length !== 0 || errMsg ? (
        <>
          {errMsg ? <ErrMsg errMsg={errMsg} /> : <section>{content}</section>}
        </>
      ) : (
        <section>
          <GroupsList />
        </section>
      )}
    </div>
  );
};
