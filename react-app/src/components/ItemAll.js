import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getItemAll } from "../store/item";
import Item from "./Item";

export default function ItemAll() {
  const item = useSelector((state) => state.item.item);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getItemAll());
  }, []);

  return (
    <div>
      <h2> All Items:</h2>

      {Object.entries(item).map((i) => {
        return (
          <>
            <Link to={`/item/${i[0]}`}>
              <Item item={i[1]} />
            </Link>
          </>
        );
      })}
    </div>
  );
}
