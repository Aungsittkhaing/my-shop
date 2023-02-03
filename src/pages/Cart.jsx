import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/StateContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useStateContext();
  const [total, setTotal] = useState(0);

  const increasePrice = (price) => {
    setTotal(total + price);
  };
  const decreasePrice = (price) => {
    setTotal(total - price);
  };

  const navigate = useNavigate();
  const navigateHandler = () => {
    dispatch({ type: "CART_EMPTY" });
    navigate("/success");
  };
  useEffect(() => {
    setTotal(cart.reduce((initial, current) => initial + current.price, 0));
  }, []);
  return (
    <>
      {cart.length > 0 ? (
        <div className="grid grid-cols-4">
          <div className=" col-span-3 flex flex-col gap-5">
            {cart?.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                increasePrice={increasePrice}
                decreasePrice={decreasePrice}
              />
            ))}
          </div>
          <div className="col-span-1">
            <div className="p-10 bg-gray-50 rounded shadow-lg">
              <h1 className="text-3xl font-semibold text-paragraph">
                Total Price - ${total.toFixed(2)}
              </h1>
              <button
                onClick={navigateHandler}
                className="px-5 py-2 my-5 bg-info rounded uppercase shadow-lg text-primary"
              >
                Check Out
              </button>
              <button
                className="px-5 py-2 my-5 ml-2 bg-danger rounded uppercase shadow-lg text-primary"
                onClick={() => dispatch({ type: "CART_EMPTY" })}
              >
                Card Empty
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="bg-secondary p-20 rounded shadow-lg mt-20 animate__animated animate__bounceInDown">
            <h1 className="my-5 text-4xl font-semibold text-header tracking-wider">
              Your Cart is Empty
            </h1>
            <Link to="/">
              <button className="px-5 py-2 bg-info rounded text-primary shadow-lg uppercase transition hover:scale-105">
                Go Shopping
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
