import React from "react";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
const Card = ({ product }) => {
  const { dispatch } = useStateContext();
  return (
    <div className="w-80 border-2 p-5 rounded-lg hover:shadow-xl cursor-pointer transform transition hover:scale-105">
      <img src={product?.image} className="h-[200px] mx-auto my-3" alt="" />
      <h3 className="text-header font-bold tracking-wider my-3">
        {product?.title?.substring(0, 25)}...
      </h3>
      <div className="flex items-center gap-1">
        <BsStarFill className="text-danger" />
        <small className="text-info font-semibold">
          {product?.rating?.rate}
        </small>
      </div>
      <p className="text-header text-xl my-3">${product?.price}</p>
      <div>
        <button
          onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          className="bg-info text-primary px-5 py-2 rounded shadow-lg transform transition hover:scale-90"
        >
          Add to Cart
        </button>
        <Link to={`/detail/${product.id}`}>
          <button className="bg-secondary text-primary px-5 py-2 rounded shadow-lg ml-3 transform transition hover:scale-90">
            Detail
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
