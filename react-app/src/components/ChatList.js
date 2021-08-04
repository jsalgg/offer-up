import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { readChatRoom, readChatRoomList } from "../store/chat";
import { get_multiple } from "../store/session";

export default function ChatList() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.session.users);
  const [buyers, setBuyers] = useState("");
  const [ids, setIds] = useState("");
  const chatroomList = useSelector((state) => state.chat.chatroom);
  const history = useHistory();

  const toChat = (itemId, sellerId, buyerId) => {
    dispatch(readChatRoom(itemId, sellerId, buyerId));
    history.push(`/item/${id}/chat`);
  };
  if (!chatroomList && id && user) {
    dispatch(readChatRoomList(id, user.id));
  }

  useEffect(() => {
    dispatch(readChatRoomList(id, user.id));
    if (users) {
      setBuyers(users);
    }
  }, []);

  useEffect(() => {
    if (chatroomList) {
      const keys = Object.keys(chatroomList).map(
        (key) => chatroomList[Number(key)].buyer_id
      );
      dispatch(get_multiple(keys));
      setBuyers(users);
    }
  }, [chatroomList, buyers, ids, users]);
  return (
    <div className="p-6">
      <div className="border-solid border-4 border-green-500 py-4 px-8 bg-white shadow-lg rounded-lg ">
        <div>
          {chatroomList &&
            buyers &&
            Object.values(chatroomList).map((chatroom, ind) => {
              return (
                <>
                  {buyers && (
                    <button
                      key={ind}
                      onClick={() => toChat(id, user.id, chatroom.buyer_id)}
                      className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Chat with{" "}
                      {buyers[chatroom.buyer_id]
                        ? buyers[chatroom.buyer_id].name
                        : null}
                    </button>
                  )}
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
/*
you probbLY Wont remember
get the list of chatrooms
display list of chatrooms
onClick for each of that list to Chat.js
the rest should take care

*/
