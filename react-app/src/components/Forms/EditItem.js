import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getItem } from "../../store/item";
import DeleteItem from "./DeleteItem";
import { editItem } from "../../store/item";
const EditItem = () => {
  const { id } = useParams();
  console.log(id);
  const user = useSelector((state) => state.session.user);
  const item = useSelector((state) => state.item[id]);
  console.log(item);
  const history = useHistory();
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  const [postedOn, setPostedOn] = useState();
  const [ownerId, setOwnerId] = useState(user.id);
  const [description, setDescription] = useState();
  const [location, setLocation] = useState(user.location);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItem(id));
  }, []);
  useEffect(() => {
    setName(item ? item.name : "");
    setType(item ? item.type : "");
    setPrice(item ? item.price : "");
    setPostedOn(new Date());
    setOwnerId(item ? item.owner_id : "");
    setDescription(item ? item.description : "");
    setLocation(item ? item.location : "");
  }, [item]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      editItem(id, name, type, price, postedOn, ownerId, description, location)
    );
    history.push(`/item/${item.id}`);
  };
  const deleteRedirect = () => {
    history.push(`/item/${id}/delete`);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div>
          <label className="block text-green-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            onChange={(ev) => {
              setName(ev.target.value);
            }}
            value={name}
          ></input>
        </div>
        <div>
          <label className="block text-green-700 text-sm font-bold mb-2">
            Type
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
          <label className="block text-green-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="price"
            onChange={(ev) => {
              setPrice(ev.target.value);
            }}
            value={price}
          ></input>
        </div>
        <div>
          <label className="block text-green-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="textarea"
            name="description"
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
            value={description}
            required={true}
          ></textarea>
        </div>
        <button
          className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Edit Item
        </button>
      </form>
      <button
        className="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={deleteRedirect}
      >
        Delete Item
      </button>
    </>
  );
};
export default EditItem;
