import React from "react";
import { useState } from "react";
import {
  BsTrashFill,
  BsPlusCircleFill,
  BsDashCircleFill,
} from "react-icons/bs";
import { useStateContext } from "../contexts/StateContext";
const CartItem = ({ item, increasePrice, decreasePrice }) => {
  const { dispatch } = useStateContext();
  const [qty, setQty] = useState(1);
  const increaseQty = () => {
    setQty((prev) => prev + 1);
    increasePrice(item.price);
  };
  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      decreasePrice(item.price);
    }
  };
  const removeItemHandler = () => {
    decreasePrice(item?.price * qty);
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };
  return (
    <div className="flex items-start gap-4">
      <img src={item?.image} className="h-32 border-2 p-4 rounded" alt="" />
      <div className="">
        <h3 className="text-2xl font-semibold text-header">{item?.title}</h3>
        <p className="text-secondary text-3xl my-3">${item?.price * qty}</p>
        <div className="flex gap-3 items-center">
          <BsDashCircleFill
            className="text-3xl text-danger cursor-pointer"
            onClick={decreaseQty}
          />
          <p className="text-2xl">{qty}</p>
          <BsPlusCircleFill
            className="text-3xl text-info cursor-pointer"
            onClick={increaseQty}
          />
          <BsTrashFill
            className="text-danger text-2xl cursor-pointer"
            onClick={removeItemHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
