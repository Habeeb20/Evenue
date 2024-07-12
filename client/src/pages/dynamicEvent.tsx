import { useParams } from "react-router-dom";
import { Card } from "../components/event/card";
import { useState, useEffect } from "react";
import { Response } from "../typesAndInterfaces/events/getEvent";
import getEventFn from "../lib/events/getEvent";
import { ErrMsg } from "../components/global/errMsg";
import { GroupSuggestions } from "../components/groups/suggestions";

export const DynamicEvent = () => {
  const { event_id } = useParams();
  const [res, setres] = useState<Response>();
  const [errMsg, setErrMsg] = useState("");

  // convert event_id to number
  const eventId = Number(event_id);

  if (!eventId) {
    throw new Error("Missing event_id");
  }

  useEffect(() => {
    try {
      getEventFn({ event_id: eventId, setErrMsg }).then((res) => {
        res && setres(res);
      });
    } catch (error) {}
  }, [eventId]);

  const cardContent = res?.result.map((event) => (
    <Card
      key={event.event_id}
      {...event}
    />
  ));

  return (
    <div>
      {errMsg ? (
        <ErrMsg errMsg={errMsg} />
      ) : (
        <>
          {cardContent}
          {/* <p>Review component here</p> */}
          <GroupSuggestions />
        </>
      )}
    </div>
  );
};
