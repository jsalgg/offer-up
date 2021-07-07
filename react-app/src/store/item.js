const SET_ITEM = "items/SET_ITEM";
const REMOVE_ITEM = "items/REMOVE_ITEM";

const setItemDispatch = (item) => ({
  type: SET_ITEM,
  payload: item,
});

const deleteItemDispatch = (item) => ({
  type: REMOVE_ITEM,
  payload: item,
});

export const getItem = (id) => async (dispatch) => {
  const response = await fetch(`/api/item/${id}/`);
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setItemDispatch(data));
  return {};
};

export const getItemAll = () => async (dispatch) => {
  const response = await fetch("/api/item/all");
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setItemDispatch(data));
  return {};
};

export const newItem =
  (name, type, price, posted_on, owner_id, description, location) =>
  async (dispatch) => {
    const response = await fetch("/api/item/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        price,
        posted_on: posted_on.toISOString().slice(0, 10),
        owner_id,
        description,
        location,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(setItemDispatch(data));
    return {};
  };

export function deleteItem(id) {
  return async function (dispatch) {
    const res = await fetch(`/api/item/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      const responseObject = await res.json();
      dispatch(deleteItemDispatch(responseObject));
      return responseObject;
    } else {
      throw res;
    }
  };
}

export const editItem =
  (id, name, type, price, posted_on, owner_id, description, location) =>
  async (dispatch) => {
    const response = await fetch(`/api/item/${id}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        type,
        price,
        posted_on: posted_on.toISOString().slice(0, 10),
        owner_id,
        description,
        location,
      }),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }

    dispatch(setItemDispatch(data));
    return {};
  };
const initialState = { item: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEM:
      return { item: action.payload };
    case REMOVE_ITEM:
      return { item: null };
    default:
      return state;
  }
}
