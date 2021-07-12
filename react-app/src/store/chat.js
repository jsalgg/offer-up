const START_CHAT = "chat/START_CHAT";

const startChatDispatch = (name, room) => ({
  type: START_CHAT,
  payload: { name, room },
});

export const startChat = (name, room) => async (dispatch) => {
  const response = await fetch(`/api/chat/chat`);
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(startChatDispatch(data));
  return {};
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case START_CHAT:
      return { ...state, chat: action.payload };
    default:
      return state;
  }
}
