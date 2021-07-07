import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getItem } from "../../store/item";
import { deleteItem } from "../../store/item";

const DeleteItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(deleteItem(id));
    history.push(`/`);
  };

  return (
    <>
      <p>Are you sure you want to delete?</p>
      <form onSubmit={onSubmit}>
        <button type="submit">Delete Item</button>
      </form>
    </>
  );
};
export default DeleteItem;
