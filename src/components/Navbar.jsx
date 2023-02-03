import React from "react";
import { SiShopify } from "react-icons/si";
import { BsSearch } from "react-icons/bs";
import { HiShoppingCart } from "react-icons/hi";
import { useStateContext } from "../contexts/StateContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {
    search,
    setSearch,
    state: { cart },
  } = useStateContext();
  return (
    <nav className="flex justify-between bg-primary shadow-md px-5 py-2 my-5 rounded">
      <Link to="/">
        <div className="flex items-center gap-4">
          <SiShopify className="text-4xl text-info" />
          <h1 className="text-info tracking-wider text-xl uppercase font-semibold">
            ask-shop
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="/cart">
          <div className="flex items-center text-white bg-header rounded px-4 py-2 gap-2">
            <HiShoppingCart />
            <small>{cart.length}</small>
          </div>
        </Link>
        <div className="flex items-center gap-2 border-2 px-2 py-2 rounded">
          <BsSearch />
          <input
            type="text"
            className="outline-none bg-transparent"
            placeholder="search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
