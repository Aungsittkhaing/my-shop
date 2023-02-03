import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getData } from "../api";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
  const initialState = {
    products: [],
    cart: [],
  };
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);

  const reducer = (state, action) => {
    switch (action.type) {
      case "Get_Products":
        return { ...state, products: action.payload };
      case "ADD_TO_CART":
        const item = action.payload;
        const isExisted = state.cart.find((c) => c.id === item.id);
        if (isExisted) {
          return {
            ...state,
            cart: state.cart.map((c) =>
              c.id === item.id ? { ...state } : { ...c }
            ),
          };
        } else {
          return {
            ...state,
            cart: [...state.cart, { ...item }],
          };
        }
      case "REMOVE_FROM_CART":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
      case "CART_EMPTY":
        return {
          ...state,
          cart: (state.cart = []),
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    const data = await getData("/products");
    setProductList(data);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const data = { state, search, setSearch, dispatch };
  useEffect(() => {
    dispatch({ type: "Get_Products", payload: productList });

    //filter for search
    const filterProducts = productList.filter((pd) =>
      pd.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
    dispatch({ type: "Get_Products", payload: filterProducts });
  }, [productList, search]);

  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};
export const useStateContext = () => useContext(StateContext);
