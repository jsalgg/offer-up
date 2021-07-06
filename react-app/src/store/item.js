const NEW_ITEM = "items/NEW_ITEM";
const REMOVE_ITEM = "items/REMOVE_ITEM";

const newItemDispatch = (item) => ({
  type: NEW_ITEM,
  payload: item,
});

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

    export const editItem =
      (name, type, price, posted_on, owner_id, description, location) =>
      async (dispatch) => {
        const response = await fetch("/api/item/edit", {
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

        dispatch(newItemDispatch(data));
        return {};
      };
    const initialState = { item: null };

    export default function reducer(state = initialState, action) {
      switch (action.type) {
        case NEW_ITEM:
          return { item: action.payload };
        case REMOVE_ITEM:
          return { item: null };
        default:
          return state;
      }
    }
  };
