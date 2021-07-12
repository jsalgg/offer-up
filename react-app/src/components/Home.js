import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const gotoEM = () => {
    history.push("/item/filter/Electronics%20and%20Media");
    window.location.reload();
  };
  const gotoHG = () => {
    history.push("/item/filter/Home%20and%20Garden");
    window.location.reload();
  };
  const gotoCSA = () => {
    history.push("/item/filter/Clothing,%20Shoes,%20and%20Accessories");
    window.location.reload();
  };
  const gotoBK = () => {
    history.push("/item/filter/Baby%20and%20Kids");
    window.location.reload();
  };
  const gotoV = () => {
    history.push("/item/filter/Vehicles");
    window.location.reload();
  };
  const gotoTGH = () => {
    history.push("/item/filter/Toys,%20Games,%20and%20Hobbies");
    window.location.reload();
  };
  const gotoSO = () => {
    history.push("/item/filter/Sports%20and%20Outdoors");
    window.location.reload();
  };
  const gotoCA = () => {
    history.push("/item/filter/Collectibles%20and%20Art");
    window.location.reload();
  };
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-5 bg-green-500">
        <button onClick={gotoEM} className="text-white">
          Electronics & Media
        </button>
        <button onClick={gotoHG} className="text-white">
          Home & Garden
        </button>
        <button onClick={gotoCSA} className="text-white">
          Clothing, Shoes, & Accessories
        </button>
        <button onClick={gotoBK} className="text-white">
          Baby & Kids
        </button>
        <button onClick={gotoV} className="text-white">
          Vehicles
        </button>
        <button onClick={gotoTGH} className="text-white">
          Toys, Games, & Hobbies
        </button>
        <button onClick={gotoSO} className="text-white">
          Sports & Outdoors{" "}
        </button>
        <button onClick={gotoCA} className="text-white">
          Collectibles & Art
        </button>
      </nav>
      <div className="flex justify-center items-center p-6">
        <h1 className="text-green-500 text-xl">
          The simpler way to buy and sell locally!
        </h1>
      </div>
    </>
  );
};
export default Home;
