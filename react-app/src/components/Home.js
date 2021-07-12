import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between p-5 bg-green-500">
        <button className="text-white">Electronics & Media</button>
        <button className="text-white">Home & Garden</button>
        <button className="text-white">Clothing, Shoes, & Accessories</button>
        <button className="text-white">Baby & Kids</button>
        <button className="text-white">Vehicles</button>
        <button className="text-white">Toys, Games, & Hobbies</button>
        <button className="text-white">Sports & Outdoors </button>
        <button className="text-white">Collectibles & Art</button>
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
