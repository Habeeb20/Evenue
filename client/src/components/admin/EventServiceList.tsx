import { useEffect, useState } from "react";
import deleteEventServicesFn from "../../lib/admin/deleteEventServices";
import getEventServiceFn, { Welcome3 } from "../../lib/admin/getEventService";
import unVerifyEventServiceFn from "../../lib/admin/unVerifyEventService";
import verifyEventServiceFn from "../../lib/admin/verifyEventService";

export const EventServiceList = () => {
  const [errMsg, setErrMsg] = useState("");
  const [eventServiceList, setEventServiceList] = useState<Welcome3>();
  useEffect(() => {
    (async () => {
      const res = await getEventServiceFn({ setErrMsg });

      res && setEventServiceList(res);
    })();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await deleteEventServicesFn({
      setErrMsg,
      event_services_id: id.toString(),
    });

    if (res?.message.includes("success")) {
      const res1 = await getEventServiceFn({ setErrMsg });
      res1 && setEventServiceList(res1);
    }
  };

  const handleVerify = async (id: string) => {
    const res = await verifyEventServiceFn({
      setErrMsg,
      event_services_id: id.toString(),
    });
    if (res?.message.includes("success")) {
      const res1 = await getEventServiceFn({ setErrMsg });
      res1 && setEventServiceList(res1);
    }
  };

  const handleUnVerify = async (id: string) => {
    const res = await unVerifyEventServiceFn({
      setErrMsg,
      event_services_id: id.toString(),
    });
    if (res?.message.includes("success")) {
      const res1 = await getEventServiceFn({ setErrMsg });
      res1 && setEventServiceList(res1);
    }
  };
  return (
    <div>
      Event Services
      {errMsg && <p>{errMsg}</p>}
      <ol>
        {eventServiceList?.result.map((es) => (
          <li key={es.id}>
            {es.name}
            <button onClick={() => handleDelete(es.id.toString())}>
              Delete
            </button>
            {es.verified === "1" ? (
              <button onClick={() => handleUnVerify(es.id.toString())}>
                Un-verify
              </button>
            ) : (
              <button onClick={() => handleVerify(es.id.toString())}>
                Verify
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
