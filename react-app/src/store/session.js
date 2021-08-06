// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GET_USER = "session/GET_USER";
const GET_ALL_USER = "session/GET_ALL_USER";
const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});
const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});
const getAllUser = (users) => ({
  type: GET_ALL_USER,
  payload: users[0],
});
const initialState = { user: null, user_2: null, users: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.errors) {
    return;
  }

  dispatch(setUser(data));
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(setUser(data));
  return {};
};

export const get_user = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/get/${id}`);
  const data = await res.json();
  dispatch(getUser(data));
  return {};
};

export const get_multiple = (ids) => async (dispatch) => {
  let arr = {};
  for (const id in ids) {
    const res = await fetch(`/api/users/get/${ids[id]}`);
    const data = await res.json();
    arr[data.id] = data;
  }
  const obj = [arr];
  dispatch(getAllUser(obj));
  return {};
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  dispatch(removeUser());
};

export const signUp =
  (name, email, password, location, profile_image, joined_date) =>
  async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        location,
        profile_image,
        joined_date: joined_date.toString(),
      }),
    });
    const data = await response.json();
    if (data.errors) {
      return data;
    }

    dispatch(setUser(data));
    return {};
  };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    case GET_USER:
      if (state.user.id !== action.payload.id) {
        return {
          user: { ...state.user },
          user_2: action.payload,
          users: { ...state.users },
        };
      } else {
        return { ...state };
      }
    case GET_ALL_USER:
      const obj = action.payload;
      return {
        user: { ...state.user },
        user_2: { ...state.user_2 },
        users: { ...obj },
      };

    default:
      return state;
  }
}
