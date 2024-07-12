import { useEffect, useState } from "react";
import checkIsAdminFn from "../../lib/admin/checkIsAdmin";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const AdminIndex = () => {
  const [errMsg, setErrMsg] = useState("");
  const navigator = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await checkIsAdminFn({ setErrMsg });

      res?.message.includes("success") ? setErrMsg("") : navigator("/");
    })();
  });
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Admin</title>
        <link rel="canonical" href="https://evenue.ng/admin" />
      </Helmet>
      {errMsg && <p>{errMsg}</p>}
      <ol>
        <li>
          <Link to={`/admin/event-list`}> Delete event</Link>
        </li>
        <li>
          {" "}
          <Link to={`/admin/venue-list`}>Delete venue</Link>
        </li>
        <li>
          <Link to={`/admin/event-services`}>Delete event service</Link>
        </li>
        <li>
          <Link to={`/admin/user-list`}>Delete user</Link>
        </li>
        <li>
          <Link to={`/admin/stories`}>Delete story</Link>
        </li>
        <li>
          <Link to={`/admin/short-videos`}>Delete short videos</Link>
        </li>
        <li>
          <Link to={`/admin/group-list`}>Delete group</Link>
        </li>
        <li>
          <Link to={`/admin/group-post-list`}>Delete group post</Link>
        </li>
        <li>
          <Link to={`/admin/group-post-comment-list`}>
            Delete group post comment
          </Link>
        </li>
        <li>
          <Link to={`/admin/home-advert`}>Home page advert</Link>
        </li>
        <li>
          <Link to={`/admin/delete-home-advert`}>Delete home page advert</Link>
        </li>
      </ol>
    </div>
  );
};
