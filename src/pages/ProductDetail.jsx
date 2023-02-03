import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../api";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/StateContext";
import Spinner from "../components/spinner/Spinner";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const { dispatch } = useStateContext();
  const getProductDetail = async () => {
    setProduct(await getData(`/products/${id}`));
  };
  const getProductByCat = async () => {
    const data = await getData(`/products/category/${product.category}`);
    const filterData = data?.filter((item) => item.id !== product.id);
    setProducts(filterData);
  };
  useEffect(() => {
    getProductDetail();
    getProductByCat();
  }, [products, product]);
  return (
    <>
      {product && products.length > 0 ? (
        <div className="">
          <div className="flex gap-5 items-start my-20">
            <img
              src={product?.image}
              className="h-96 shadow-lg border p-10"
              alt=""
            />
            <div className="flex flex-col gap-5 mt-5">
              <p className="bg-info px-2 py-1 font-bold rounded-full w-40 text-center text-xs text-primary">
                {product?.category}
              </p>
              <h3>{product?.title}</h3>
              <div className="">
                <p className="text-header font-semibold text-lg">
                  Descritption
                </p>
                <p className="text-secondary font-semibold text-lg tracking-wider leading-6 mt-1">
                  {product?.description}
                </p>
              </div>
              <p className="flex items-center gap-2">
                <BsStarFill className="text-danger text-xl" />
                <small className="text-paragraph font-semibold text-lg">
                  rating - {product?.rating?.rate}
                </small>
              </p>
              <p className="text-header text-xl font-semibold">
                ${product?.price}
              </p>
              <div className="">
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: product })
                  }
                  className="py-2 w-40 rounded shadow-lg bg-info text-primary transform transition hover:scale-90"
                >
                  Add to Cart
                </button>
                <Link to="/success">
                  <button className="py-2 ml-3 w-40 rounded shadow-lg bg-secondary text-primary transform transition hover:scale-90">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="my-20">
            <h1 className="text-2xl font-semibold text-header">
              You may also like
            </h1>
            <div className="flex flex-wrap gap-7 my-10">
              {products?.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt=""
                    className="h-52 border-2 shadow-lg p-5 rounded"
                  />
                  <p className="font-semibold text-header mt-1">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProductDetail;
