import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from "../constants/orderConstants";

export const orderCreateReucer = (state={},action) =>{
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {loading: true};
        case CREATE_ORDER_SUCCESS:
            return {loading: false, success: true, order: action.payload};
        case CREATE_ORDER_FAIL:
            return {loading: false, error: action.payload};
        case CREATE_ORDER_RESET:
            return {};
        default:
            return state;
    }
}

export const orderDetailsReducer = (state={loading:true, order:{}},action) =>{
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return{loading: true};
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload};
        case ORDER_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
};

export const orderListReducer = (state = {orders:[]},action) =>{
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {loading: true};
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: action.payload};
        case ORDER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}