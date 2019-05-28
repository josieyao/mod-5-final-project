import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
// import history from './history'

const initialState = {
  products: [],
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  currentProduct: {},
  currentUser: {}
};

const reducer = (currentState, action) => {
  // console.log(action);
  let newState;
  switch (action.type) {
    case "FETCH_PRODUCTS":
      newState = {
        ...currentState,
        products: action.products
      };
      break;
    case "SELECT_PRODUCT_ITEM":
      newState = {
        ...currentState,
        currentProduct: action.product
      };
      break;
    case "ADD_ITEM_TO_CART":
      newState = {
        ...currentState,
        cartItems: [...currentState.cartItems, { ...action.cartItems, quantity: 1 }]
      };
      break;
    case "DELETE_ITEM_FROM_CART":
      newState = {
        ...currentState,
        cartItems: currentState.cartItems.filter(item => item.id !== action.id)
      };
      break;
    case "INCREMENT_QUANTITY":
      newState = {
        ...currentState,
        cartItems: currentState.cartItems.map(item =>
          item.id === action.id ? { ...item, quantity: item.cart.quantity + 1 } : item
        )
      };
      break;
    case "DECREMENT_QUANTITY":
        newState = {
          ...currentState,
          cartItems: currentState.cartItems.map(item =>
            item.id === action.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
          )
        };
      break;
    case "LOAD_TEMPORARY_CART":
      newState = {
        ...currentState,
        cartItems: action.cartItems
      };
      break;
    case "CURRENT_USER":
        newState = {
          ...currentState,
          currentUser: action.currentUser
    };
    break;
    default:
      newState = currentState;
  }
  // console.log(action.type);
  localStorage.setItem("cart", JSON.stringify(newState.cartItems));
  return newState;
};

const middleware = compose(
  applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducer, initialState, middleware);
export default store;
