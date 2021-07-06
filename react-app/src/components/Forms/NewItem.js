import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { newItem } from "../../store/item";

const NewItem = () => {
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [name, setName] = useState("");
  const [type, setType] = useState("Select Type");
  const [price, setPrice] = useState("");
  const [postedOn, setPostedOn] = useState(new Date());
  const [ownerId, setOwnerId] = useState(user.id);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(user.location);
  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      newItem(name, type, price, postedOn, ownerId, description, location)
    );
    history.push("/");
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(ev) => {
            setName(ev.target.value);
          }}
          value={name}
        ></input>
      </div>
      <div>
        <label>Type</label>
        <select
          value={type}
          onChange={(ev) => {
            setType(ev.target.value);
          }}
        >
          <option value="Electronics and Media">Electronics and Media</option>
          <option value="Home and Garden">Home and Garden</option>
          <option value="Clothing, Shoes, and Accessories">
            Clothing, Shoes, and Accessories
          </option>
          <option value="Baby and Kids">Baby and Kids</option>
          <option value="Baby and Kids">Baby and Kids</option>
          <option value="Vehicles">Vehicles</option>
          <option value="Toys, Games, and Hobbies">
            Toys, Games, and Hobbies
          </option>
          <option value="Sports and Outdoors">Baby and Kids</option>
          <option value="Collectibles and Art">Collectibles and Art</option>
        </select>
      </div>
      <div>
        <label>Price</label>
        <input
          type="number"
          name="price"
          onChange={(ev) => {
            setPrice(ev.target.value);
          }}
          value={price}
        ></input>
      </div>
      <div>
        <label>Description</label>
        <textarea
          type="textarea"
          name="description"
          onChange={(ev) => {
            setDescription(ev.target.value);
          }}
          value={description}
          required={true}
        ></textarea>
      </div>
      <button type="submit">Post Item</button>
    </form>
  );
};
export default NewItem;
