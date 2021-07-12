const SET_ITEM = "items/SET_ITEM";
const REMOVE_ITEM = "items/REMOVE_ITEM";
const SET_ALL = "items/SET_ALL";
const SET_ALL_FILTER = "items/SET_ALL_FILTER";

const setItemDispatch = (item) => ({
  type: SET_ITEM,
  payload: item,
});

const setItemsDispatch = (items) => ({
  type: SET_ALL,
  payload: items,
});
const setItemsDispatchFilter = (items) => ({
  type: SET_ALL_FILTER,
  payload: items,
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
  dispatch(setItemsDispatch(data));
  return {};
};

export const getItemFilter = (query) => async (dispatch) => {
  const response = await fetch(`/api/item/filter/${query}/`);
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setItemsDispatchFilter(data));
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
const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, [action.payload.id]: action.payload };
    case SET_ALL:
      return { ...state, ...action.payload };
    case SET_ALL_FILTER:
      state = {};
      return { ...action.payload };
    case REMOVE_ITEM:
      delete state[action.payload.id];
      return { ...state };
    default:
      return state;
  }
}
