import React, { useEffect, useState } from "react";
import { InlineErrMsg } from "../components/global/inlineErrMsg";
import getChatHistoryFn from "../lib/chat/getHistory";
import getProfileFn from "../lib/profile/getProfile";
import { Res4ChatHistory } from "../typesAndInterfaces/chat/res4History";
import { ProfileRes } from "../typesAndInterfaces/profile/getProfile";
import styles from "./styles/dynamicChatZ02.module.css";

interface Message {
  senderId: number;
  message: string;
  recipientId: string;
}

function DynamicChat({
  recipient_id,
  first_name,
}: {
  recipient_id: string;
  first_name: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [msgHistory, setMsgHistory] = useState<Res4ChatHistory>();
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [resProfile, setResProfile] = useState<ProfileRes>();
  const [errMsg, setErrMsg] = useState("");

  const websocket = new WebSocket(`ws://localhost:4192`);

  useEffect(() => {
    getProfileFn({ setErrMsg })
      .then((res) => {
        setResProfile(res);
        const user_id = res?.profile.find((user) => user.user_id)?.user_id;
        if (!user_id) {
          throw new Error("Missing recipient_id");
        }
        return getChatHistoryFn({
          fk_sender_id: user_id,
          fk_recipient_id: Number(recipient_id),
          setErrMsg,
        });
      })
      .then((res) => {
        setMsgHistory(res);
      })
      .catch((error) => {
        setErrMsg(error.message);
      });
  }, [recipient_id]);

  useEffect(() => {
    websocket.onmessage = function (event) {
      const message = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, message]);
    };
    setWs(websocket);
  }, []);

  const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ws && inputMessage.trim() !== "") {
      const user_id = resProfile?.profile.find((user) => user.user_id)?.user_id;
      if (!user_id) {
        setErrMsg("Missing user_id");
        return;
      }
      const messageData = {
        senderId: user_id,
        message: inputMessage,
        recipientId: recipient_id,
      };
      ws.send(JSON.stringify(messageData));
      setInputMessage("");
    }
  };

  const mappedHistory = msgHistory?.result.map((message) => {
    return (
      <>
        <div key={message.id}>
          <p>{message.message}</p>
        </div>
        <hr />
      </>
    );
  });

  return (
    <div className={styles.containerZ02}>
      <h2>Chat with {first_name}</h2>
      <div>{mappedHistory}</div>
      <div>
        {messages.map((message, index) => (
          <>
            <div
              key={index}
              className={
                message.recipientId === message.senderId.toString()
                  ? styles.sent
                  : styles.received
              }
            >
              <p>{message.message}</p>
            </div>
            <hr />
          </>
        ))}
      </div>
      <div>
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      {errMsg && <InlineErrMsg errMsg={errMsg} />}
    </div>
  );
}

export default DynamicChat;
