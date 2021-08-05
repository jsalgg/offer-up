import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getItemAll } from "../store/item";
import Item from "./Item";
export default function ItemAll() {
  const item = useSelector((state) => Object.values(state.item));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemAll());
  }, []);

  return (
    <div>
      <h2> All Items:</h2>
      <div className="flex flex-wrap">
        {item.length > 0 &&
          item.map((i) => {
            return (
              <Link key={i.id} to={`/item/${i.id}`}>
                <Item key={i.id} item={i} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}
