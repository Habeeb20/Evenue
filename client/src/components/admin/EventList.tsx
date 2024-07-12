import { useEffect, useState } from "react";
import deleteEventFn from "../../lib/admin/deleteEvent";
import getEventsFn, { Welcome10 } from "../../lib/admin/getEvents";
import blackListEventFn from "../../lib/admin/blackListEvent";

export const EventListInAdmin = () => {
  const [errMsg, setErrMsg] = useState("");
  const [eventsList, setEventsList] = useState<Welcome10>();
  useEffect(() => {
    (async () => {
      const res = await getEventsFn({ setErrMsg });

      res && setEventsList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteEventFn({ setErrMsg, event_id: id.toString() });

    if (res?.message.includes("success")) {
      const res1 = await getEventsFn({ setErrMsg });
      res1 && setEventsList(res1);
    }
  };

  const handleBlackList = async (
    event_id: string,
    action: "blacklist" | "unblacklist"
  ) => {
    const res = await blackListEventFn({ setErrMsg, event_id, action });

    if (res?.message.includes("success")) {
      const res1 = await getEventsFn({ setErrMsg });
      res1 && setEventsList(res1);
    }
  };
  return (
    <div>
      Events
      {errMsg && <p>{errMsg}</p>}
      <ul>
        {eventsList?.result.map((event) => (
          <li key={event.event_id}>
            {event.name}
            <button onClick={() => handleDelete(event.event_id.toString())}>
              Delete
            </button>
            {event.blacklist === "1" ? (
              <button
                onClick={() =>
                  handleBlackList(event.event_id.toString(), "unblacklist")
                }
              >
                Un-blacklist
              </button>
            ) : (
              <button
                onClick={() =>
                  handleBlackList(event.event_id.toString(), "blacklist")
                }
              >
                Blacklist
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
