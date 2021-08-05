import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
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
        <button
          className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Delete Item
        </button>
      </form>
    </>
  );
};
export default DeleteItem;
