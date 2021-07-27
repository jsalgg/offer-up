import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { readChatRoom, readChatRoomList } from "../store/chat";

export default function ChatList() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const user = useSelector((state) => state.session.user);
  dispatch(readChatRoomList(id, user.id));
  const chatroomList = useSelector((state) => state.chat.chatroom);
  const history = useHistory();

  const toChat = (itemId, sellerId, buyerId) => async () => {
    dispatch(readChatRoom(itemId, sellerId, buyerId));
    history.push(`/item/${id}/chat`);
  };
  return (
    <div className="p-6">
      <div className="border-solid border-4 border-green-500 py-4 px-8 bg-white shadow-lg rounded-lg ">
        <div>
          {chatroomList &&
            Object.values(chatroomList).map((chatroom, ind) => {
              return (
                <>
                  <button
                    key={ind}
                    onClick={toChat(id, user.id, chatroom.buyer_id)}
                    className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    See Messages {ind}
                  </button>
                  ;
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
