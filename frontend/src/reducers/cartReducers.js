import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

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
                
            }
        default:
            return state;
    }
}