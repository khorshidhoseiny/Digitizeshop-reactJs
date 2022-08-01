import { createContext, useContext, useReducer } from "react";

import { products } from "../../Data/data";

const FILTER_PRODUCTS = "FILTER_PRODUCTS";
const FILTER_DELETE = "FILTER_DELETE";
const SORT_PRODUCTS = "SORT_PRODUCTS";

export const filterDelete = () => {
  return { type: FILTER_DELETE };
};

export const filterProduct = (value) => {
  return { type: FILTER_PRODUCTS, payload: value };
};

export const sortProduct = (value) => {
  return { type: SORT_PRODUCTS, payload: value };
};

const filterContext = createContext();
const filterContextDispatcher = createContext();

 const initialState = {
  productList: products,
  filterItem: {
    size: "",
    price: 1000000,
  },
  sort: "low",
  total: [],
};

const FilterReducer = (state, action) => {
    switch (action.type) {
      case FILTER_PRODUCTS:
        return filterProductHandler(state, action);
      case SORT_PRODUCTS:
        return sortProductHandler(state, action);
      case FILTER_DELETE:
        return { ...initialState, sort: state.sort };
      default:
        return state;
    }
  };
  
  const filterProductHandler = (state, action) => {
    if (!action.payload) action.payload = state.filterItem;
    const total = totalHandler(action);
    const filteredPrice = products.filter((item) => {
      return item.offPrice <= action.payload.price;
    });
    const filteredSize = filteredPrice.filter((item) => {
      if (action.payload.size === initialState.filterItem.size) {
        console.log(item.size,"item.size");
        return products;
      }
      return item.size.find((s) => parseInt(s) === parseInt(action.payload.size));
    });
    return {
      ...state,
      productList: filteredSize,
      total,
      filterItem: action.payload,
    };
  };
  
  const totalHandler = (action) => {
    let total = [];
    if (action.payload.price !== initialState.filterItem.price)
      total = [...total, "price"];
    if (action.payload.size !== initialState.filterItem.size)
      total = [...total, "size"];
    return total;
  };
  
  const sortProductHandler = (state, action) => {
    if (!action.payload) action.payload = state.sort;
    switch (action.payload) {
      case "high": {
        const clone = [...state.productList];
        const sorted = clone.sort((a, b) => {
          return b.offPrice - a.offPrice;
        });
        return { ...state, productList: sorted, sort: action.payload };
      }
  
      case "low": {
        const clone = [...state.productList];
        const sorted = clone.sort((a, b) => {
          return a.offPrice - b.offPrice;
        });
        return { ...state, productList: sorted, sort: action.payload };
      }
  
      case "star": {
        const clone = [...state.productList];
        const sorted = clone.sort((a, b) => {
          return b.star - a.star;
        });
        return { ...state, productList: sorted, sort: action.payload };
      }
  
      case "fast": {
        const clone = [...state.productList];
        const sorted = clone.sort((a, b) => {
          return b.fast - a.fast;
        });
        return { ...state, productList: sorted, sort: action.payload };
      }
  
      default:
        return { ...state, sort: action.payload };
    }
  };

const FilterProvider = ({ children }) => {
  const [filter, dispatch] = useReducer(FilterReducer, initialState);
  return (
    <filterContext.Provider value={filter}>
      <filterContextDispatcher.Provider value={dispatch}>
        {children}
      </filterContextDispatcher.Provider>
    </filterContext.Provider>
  );
};

export default FilterProvider;

export const useFilter = () => useContext(filterContext);
export const useFilterAction = () => useContext(filterContextDispatcher);
