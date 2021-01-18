import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps'
import Loading from '../components/Loading';
import Message from '../components/Message';
import { CREATE_ORDER_RESET } from '../constants/orderConstants';

export default function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart);
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }
    if (!userInfo){
        props.history.push('/signin');
    }
    const orderCreate = useSelector(state => state.orderCreate);
    const {loading, success, error, order} = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((acc,item) => acc +item.quantity*item.price,0));
    cart.shippingPrice = cart.itemsPrice>350 ? toPrice(0) : toPrice(50);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const dispatch = useDispatch();
    const placeOrderHandler= () =>{
        dispatch(createOrder({...cart,orderItems: cart.cartItems}));
    }

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({type: CREATE_ORDER_RESET});
        }
    },[dispatch, order, props.history, success])

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping Information</h2>
                                <p>
                                    <strong>Name: </strong> {cart.shippingAddress.fullName}<br/>
                                    <strong>Address: </strong>{cart.shippingAddress.address}, 
                                    {cart.shippingAddress.city}, 
                                    {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                {
                                    cart.cartItems.map((item) => 
                                        <li key={item.product}>
                                            <div className='row'>
                                                <div>
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className='small'
                                                    ></img>
                                                </div>
                                                <div className='min-30'>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div>{item.quantity} x ${item.price} = ${item.quantity * item.price}</div>
                                            </div>
                                        </li>
                                    )
                                }
                            </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='col-1'>
                    <div className='card card-body'>
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Items</div>
                                    <div>${cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Order Total</div>
                                    <div>${cart.totalPrice}</div>
                                </div>
                            </li>
                            <li>
                                <button 
                                    type='button' 
                                    onClick={placeOrderHandler} 
                                    className='primary block'
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Place Order
                                </button>
                            </li>
                            {loading && <Loading></Loading>}
                            {error && <Message variant='danger'>Error</Message>}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
