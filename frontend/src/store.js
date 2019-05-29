import { createStore, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
// import history from './history'

const initialState = {
  products: [],
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem("cart")) : [],
  currentProduct: {},
  currentUser: null,
  clicked: false
  // currentTotalCost: 0
};

const reducer = (currentState, action) => {
  // console.log(localStorage.getItem("cart"))
  // console.log(action)
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
        cartItems: [...currentState.cartItems, { ...action.cartItems, cart: {quantity: 1 }}]
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
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      };
      break;
    case "SET_QUANTITY":
          newState = {
            ...currentState,
            cartItems: currentState.cartItems.map(item =>
              item.id === action.id ? { ...item, cart: {...item.cart, quantity: action.quantity }} : item
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

    // case "UPDATE_CURRENT_TOTAL_COST":
    //     newState = {
    //       ...currentState,
    //       currentTotalCost: currentState.cartItems.map(item =>
    //         item.id === action.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    //       )
    //     };
    //   break;
  }

  localStorage.setItem("cart", JSON.stringify(newState.cartItems))
  // localStorage.setItem("currentUser", JSON.stringify(newState.currentUser));
  return newState;
};

const middleware = compose(
  applyMiddleware(ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducer, initialState, middleware);
export default store;
