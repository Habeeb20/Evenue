import { useParams } from "react-router-dom";
import DynamicChat from "./dynamicChat";

export const DynamicChatWrapper = () => {
  const { recipient_id, first_name } = useParams();

  if (!recipient_id || !first_name) {
    throw new Error("Missing recipient_id or first_name");
  }
  return (
    <div>
      <DynamicChat recipient_id={recipient_id} first_name={first_name} />
    </div>
  );
};
