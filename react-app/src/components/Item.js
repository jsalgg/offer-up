import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getItem } from "../store/item";
import { createChatRoom, readChatRoom } from "../store/chat";

export default function Item({ item }) {
  const dispatch = useDispatch();
  let { id } = useParams();
  const loadedItem = useSelector((state) => state.item[id]);
  const user = useSelector((state) => state.session.user);

  const history = useHistory();
  let itemState;
  if (!item) {
    itemState = loadedItem;
  } else {
    itemState = item;
  }

  useEffect(() => {
    dispatch(getItem(id));
  }, []);

  const toEdit = () => {
    history.push(`/item/${id}/edit`);
  };
  const toChat = (itemId, sellerId, buyerId) => async () => {
    await dispatch(readChatRoom(itemId, sellerId, buyerId));
    history.push(`/item/${id}/chat`);
  };
  const toSee = (itemId) => async () => {
    history.push(`/item/${itemId}/chatlist`);
  };
  return (
    <div className="p-6">
      <div className="border-solid border-4 border-green-500 py-4 px-8 bg-white shadow-lg rounded-lg ">
        <div>
          <h2 className="text-gray-800 text-3xl font-semibold">
            {itemState && itemState.name}
          </h2>
          <p className="mt-2 text-gray-600">
            {itemState && itemState.location}
          </p>
          {id && (
            <>
              <p className="mt-2 text-gray-600">
                {itemState && itemState.description}
              </p>
              <p className="mt-2 text-gray-600">
                Posted On: {itemState && itemState.posted_on}
              </p>
            </>
          )}
        </div>
        <div className="flex justify-start mt-4">
          <p className="text-xl font-medium text-indigo-500">
            ${itemState && itemState.price}
          </p>
          <br></br>
          <div className="flex justify-end mt-4">
            {itemState && user.id === itemState.owner_id && (
              <>
                <button
                  onClick={toEdit}
                  className=" m-2 bg-transparent hover:bg-green-500 text-black font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                >
                  {" "}
                  Edit
                </button>
                <button
                  onClick={toSee(id)}
                  className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {" "}
                  See Messages{" "}
                </button>
              </>
            )}
            {itemState && user.id !== itemState.owner_id && (
              <>
                <button
                  onClick={toChat(id, itemState.owner_id, user.id)}
                  className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {" "}
                  Send Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
