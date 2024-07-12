import { AddPosts } from "./addPostForm";
import { GetPosts } from "./getPosts";

export const Posts = ({ group_id }: { group_id: string }) => {
  return (
    <>
      <AddPosts group_id={group_id} />
      <GetPosts group_id={group_id} />
    </>
  );
};
