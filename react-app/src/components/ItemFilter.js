import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getItemFilter } from "../store/item";
import Item from "./Item";
export default function ItemFilter() {
  const item = useSelector((state) => Object.values(state.item));
  const { query } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemFilter(query));
  }, []);

  return (
    <div>
      <h2> All Items from your filter:</h2>
      <div className="flex flex-wrap">
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
    </div>
  );
}
