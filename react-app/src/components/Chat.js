import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getItem } from "../store/item";
import { readMessages, createMessage } from "../store/chat";
// import { io } from "socket.io-client";
let socket;

const Chat = () => {
  const { id } = useParams();
  const history = useHistory();

  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const chatroom = useSelector((state) => state.chat.chatroom);
  console.log(id);
  const item = useSelector((state) => state.item[id]);
  // const messagesState = ;
  let chatroomId;
  if (chatroom) {
    chatroomId = Object.keys(chatroom)[0];
  } else {
    history.push(`/item/${id}`);
  }

  let dispatch = useDispatch();
  console.log("chatroom id: ", chatroomId);
  console.log("item,    : ", item);
  const messagesState = useSelector((state) => state.chat.message);

  useEffect(() => {
    dispatch(readMessages(chatroomId));
    // open socket connection
    // create websocket
    // socket = io();
    // socket.on("chat", (chat) => {
    //   setMessages((messages) => [...messages, chat]);
    // });
    // // when component unmounts, disconnect
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const reloadMessages = (chatroom) => async () => {
    dispatch(readMessages(chatroomId));
  };

  console.log("messages: ", messagesState);
  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    let timestamp = new Date();
    let date = new Date(timestamp);

    const formatDate =
      date.getMonth() +
      1 +
      "-" +
      date.getDate() +
      "-" +
      date.getFullYear() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();
    // socket.emit("chat", { user: user.name, msg: chatInput });
    console.log(formatDate);
    dispatch(
      createMessage(user.id, item.owner_id, chatroomId, chatInput, formatDate)
    );

    setChatInput("");
  };
  return (
    user && (
      <div>
        <div className="border-solid border-4 border-green-500">
          <h1 className="font-bold">Messages</h1>
          {messagesState &&
            Object.values(messagesState).map((message, ind) => (
              <div
                key={ind}
              >{`${message.sender_id}: ${message.message_content}`}</div>
            ))}
        </div>
        <form onSubmit={sendChat}>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={chatInput}
            placeholder="Enter Message"
            onChange={updateChatInput}
          />
          <button
            className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Send
          </button>
        </form>
        <button
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onClick={reloadMessages(chatroomId)}
        >
          Reload Messages
        </button>
      </div>
    )
  );
};

export default Chat;
