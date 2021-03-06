import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getItem } from "../store/item";
import { readMessages, createMessage } from "../store/chat";
// import { io } from "socket.io-client";
import { get_user } from "../store/session";
let socket;

const Chat = () => {
  const { id } = useParams();
  const history = useHistory();

  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);
  let user2 = useSelector((state) => state.session.user_2);
  const chatroom = useSelector((state) => state.chat.chatroom);
  const [personB, setPersonB] = useState("");
  const [mess, setMess] = useState("");
  let dispatch = useDispatch();
  const item = useSelector((state) => state.item[id]);
  // const messagesState = ;
  let chatroomId;
  if (chatroom) chatroomId = Object.keys(chatroom)[0];
  useEffect(() => {
    if (chatroom) {
      dispatch(readMessages(chatroomId));
      if (!personB) {
        if (chatroom[chatroomId].seller_id !== user.id) {
          const id = dispatch(get_user(chatroom[chatroomId].seller_id));
          setPersonB("fulfilled");
        } else {
          const id = dispatch(get_user(chatroom[chatroomId].buyer_id));
          setPersonB("fulfilled");
        }
      }
    } else {
      history.push(`/item/${id}`);
    }
  }, [chatroom, user, chatroomId, personB]);

  useEffect(() => {
    if (chatroom && user) {
      if (chatroom[chatroomId].seller_id !== user.id) {
        const id = dispatch(get_user(chatroom[chatroomId].seller_id));
        setPersonB(user2);
      } else {
        const id = dispatch(get_user(chatroom[chatroomId].buyer_id));
        setPersonB(user2);
      }
    }
  }, []);

  const messagesState = useSelector((state) => state.chat.message);

  useEffect(() => {
    dispatch(readMessages(chatroomId));
    setMess(messagesState);
    if (chatroom) {
      if (!personB) {
        if (chatroom[chatroomId].seller_id !== user.id) {
          const id = dispatch(get_user(chatroom[chatroomId].seller_id));
          setPersonB(user2);
        } else {
          const id = dispatch(get_user(chatroom[chatroomId].buyer_id));
          setPersonB(user2);
        }
      }
    }
    if (!user2 && chatroom) {
      if (chatroom[chatroomId].seller_id !== user.id) {
        const id = dispatch(get_user(chatroom[chatroomId].seller_id));
        setPersonB(user2);
      } else {
        const id = dispatch(get_user(chatroom[chatroomId].buyer_id));
        setPersonB(user2);
      }
    }
  }, [personB, user2, chatroom]);
  // useEffect(() => {
  //   dispatch(readMessages(chatroomId));
  //   setMess(messagesState);
  // }, [chatroomId, chatInput, messagesState]);

  const reloadMessages = () => async () => {
    dispatch(readMessages(chatroomId));
    setMess(messagesState);
  };

  const reloadUser2 = () => async () => {
    if (chatroom) {
      if (chatroom[chatroomId].seller_id !== user.id) {
        await dispatch(get_user(chatroom[chatroomId].seller_id));
      } else {
        await dispatch(get_user(chatroom[chatroomId].buyer_id));
      }
    }
    return {};
  };

  setTimeout(() => {
    reloadUser2();
  }, 3000);

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
          {messagesState && user2.name ? (
            Object.values(messagesState).map((message, ind) => (
              <div key={ind}>{`${
                message.sender_id === user.id ? user.name : user2.name
              }: ${message.message_content}
              `}</div>
            ))
          ) : (
            <div>Send the first message!</div>
          )}
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
