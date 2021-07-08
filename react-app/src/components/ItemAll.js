import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from "react-router-dom";
import { getItemAll } from "../store/item";
import Item from "./Item";
import EditItem from "./Forms/EditItem";
export default function ItemAll() {
  const item = useSelector((state) => Object.values(state.item));
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getItemAll());
  }, []);

  return (
    <div>
      <h2> All Items:</h2>
      {item.length > 0 &&
        item.map((i) => {
          return (
            <>
              <Link to={`/item/${i.id}`}>
                <Item item={i} />
              </Link>
            </>
          );
        })}
    </div>
  );
}
