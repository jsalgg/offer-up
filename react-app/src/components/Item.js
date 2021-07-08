import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getItem } from "../store/item";

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
  console.log(itemState);

  useEffect(() => {
    dispatch(getItem(id));
  }, []);
  const toEdit = () => {
    history.push(`/item/${id}/edit`);
  };
  return (
    <div>
      <h2>{itemState.name}</h2>
      <p>{itemState.description}</p>
      <p>${itemState.price}</p>
      <p>posted on: {itemState.posted_on}</p>
      <p>Located in {itemState.location}</p>
      {user.id === itemState.owner_id && (
        <button onClick={toEdit}> Edit</button>
      )}
    </div>
  );
}
