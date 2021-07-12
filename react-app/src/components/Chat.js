import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const Chat = () => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });
    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { user: user.name, msg: chatInput });
    setChatInput("");
  };

  return (
    user && (
      <div>
        <div className="border-solid border-4 border-green-500">
          <h1 className="font-bold">Messages</h1>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
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
      </div>
    )
  );
};

export default Chat;
