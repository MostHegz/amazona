import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state={ cartItems:[]},action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const existingItem = state.cartItems.find( previous => previous.product === item.product);
            if(existingItem){
                return{
                    ...state,
                    cartItems: 
                        state.cartItems.map(previous => 
                            previous.product === existingItem.product
                            ?item : 
                            previous),
                };
            } else {
                return {...state, cartItems: [...state.cartItems,item]};
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(current => current.product !== action.payload),
                
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload};
        case CART_SAVE_PAYMENT_METHOD:
            return{...state, paymentMethod: action.payload};
        case CART_EMPTY:
            return {...CART_EMPTY,cartItems: []};
        default:
            return state;
    }
}