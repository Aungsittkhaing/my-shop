import React from "react";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-secondary p-20 rounded shadow-lg mt-20 animate__animated animate__bounceInDown">
        <h1 className="my-5 text-4xl font-semibold text-header tracking-wider">
          Thank you for buying
        </h1>
        <Link to="/">
          <button className="px-5 py-2 bg-info rounded text-primary shadow-lg uppercase transition hover:scale-105">
            Go Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
