import { createStore, compose, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import history from './history'


const initialState = {
    products: [],
    cartItems: [],
    productItemQuantity: 0,
    totalCost: 0,
    currentProduct: {}
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'ADD_ITEM_TO_CART':
            return { ...currentState, 
                cartItems: [
                    ...currentState.cartItems, action.product 
                ]
            }
        break;
        case 'DELETE_ITEM_FROM_CART':
            return { ...currentState, 
                cartItems: currentState.cartItems.filter( item => (
                    item.id !== action.id
                ))
            }
        break;
        case 'UPDATE_QUANTITY_IN_CART':
            return { ...currentState, productItemQuantity: currentState.productItemQuantity + 1}
        break;
        case 'REDUCE_QUANTITY_IN_CART':
            return { ...currentState, productItemQuantity: currentState.productItemQuantity - 1 }
        break;
        case 'SELECT_PRODUCT_ITEM':
            return { 
                ...currentState, 
                currentProduct: currentState.products.find( product => ( product.id == action.id )
                )
            }
        break;
        case 'FETCH_PRODUCTS':
                return { 
                    ...currentState, 
                    products: action.products
                }
        break;
        // case 'UPDATE_TOTAL_COST':
        //     return { ...currentState, totalCost: currentState.totalCost + price }
        // break;
        // case 'REDUCE_TOTAL_COST':
        //     return { ...currentState, totalCost: currentState.totalCost - price }
        // break;
        default:
            return currentState
    }
}

const middleware = compose(
    applyMiddleware(ReduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
    reducer, 
    initialState, 
    middleware
)
export default store
// store.dispatch({ type: 'ADD_ITEM_TO_CART'})