const R_CHATROOM = "chatroom/read";
const R_CHATROOM_LIST = "chatroom/read/list";
const R_MESSAGE = "message/read";
const C_CHATROOM = "chatroom/create";
const C_MESSAGE = "message/create";

const readChatRoomDispatch = (chatroom) => ({
  type: R_CHATROOM,
  payload: chatroom,
});
const readMessageDispatch = (message) => ({
  type: R_MESSAGE,
  payload: message,
});
const createChatRoomDispatch = (chatroom) => ({
  type: C_CHATROOM,
  payload: chatroom,
});
const createMessageDispatch = (message) => ({
  type: C_MESSAGE,
  payload: message,
});

const readChatRoomListDispatch = (chatrooms) => ({
  type: R_CHATROOM_LIST,
  payload: chatrooms,
});
//read chatroom
export const readChatRoom = (itemId, sellerId, buyerId) => async (dispatch) => {
  const response = await fetch(
    `/api/chatroom/${itemId}/${sellerId}/${buyerId}`
  );
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(readChatRoomDispatch(data));
  return {};
};
//read chatrooms lists
export const readChatRoomList = (itemId, sellerId) => async (dispatch) => {
  const response = await fetch(`/api/chatroom/list/${itemId}/${sellerId}/`);
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(readChatRoomListDispatch(data));
  return {};
};

//read mewssages
export const readMessages = (chatroomId) => async (dispatch) => {
  const response = await fetch(`/api/chat/message/${chatroomId}`);
  const data = await response.json();
  if (data.errors) {
    return data;
  }
  dispatch(readMessageDispatch(data));
  return {};
};
//createchatroom,
export const createChatRoom =
  (itemId, sellerId, buyerId) => async (dispatch) => {
    const response = await fetch(`/api/chatroom/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item_id: itemId,
        seller_id: sellerId,
        buyer_id: buyerId,
        title: "created",
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(createChatRoomDispatch(data));
    return {};
  };
//cxreate message
export const createMessage =
  (senderId, recipientId, chatroomId, messageContent, messageDatetime) =>
  async (dispatch) => {
    const response = await fetch(`/api/chat/message/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender_id: senderId,
        recipient_id: recipientId,
        chatroom_id: chatroomId,
        message_content: messageContent,
        message_datetime: messageDatetime,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      return data;
    }
    dispatch(createMessageDispatch(data));
    return {};
  };
//reducer
export default function reducer(state = {}, action) {
  switch (action.type) {
    case R_CHATROOM:
      return { ...state, chatroom: { ...action.payload } };
    case R_CHATROOM_LIST:
      return {
        chatroom: { ...state.chatroom, ...action.payload },
        message: { ...state.message },
      };
    case R_MESSAGE:
      return { ...state, message: { ...action.payload } };
    case C_CHATROOM:
      return { ...state, chatroom: { ...action.payload } };
    case C_MESSAGE:
      return {
        chatroom: { ...state.chatroom },
        message: { ...state.message, [action.payload.id]: action.payload },
      };
    default:
      return state;
  }
}
