import { useEffect, useState } from "react";
import { Res4GetPost } from "../../typesAndInterfaces/groups.ts/res4GetPosts";
import getPostsFn from "../../lib/groups/getPosts";
import { PostCard } from "./postCard";
import { InlineErrMsg } from "../global/inlineErrMsg";
import styles from "./styles/getPostCBU.module.css";

export const GetPosts = ({ group_id }: { group_id: string }) => {
  const [resPost, setResPost] = useState<Res4GetPost>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    getPostsFn({ group_id, setErrMsg }).then((res) => {
      res && setResPost(res);
    });
  }, [group_id]);

  const content = resPost?.result.map((post) => (
    <PostCard
      key={post.id}
      {...post}
      group_post_id={post.id}
      group_id={group_id}
    />
  ));

  return (
    <div>
      {errMsg ? (
        <InlineErrMsg errMsg={errMsg} />
      ) : (
        <div className={styles.containerCBU}>{content}</div>
      )}
    </div>
  );
};
