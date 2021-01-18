import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if (!userInfo){
        props.history.push('/signin');
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsOrder(orderId));
    },[dispatch, orderId])

    return loading? (<Loading></Loading>) 
    : error? (<Message variant='danger'></Message>)
    : (
        <div>
            <h1>Order {order._id}</h1>
            <div className='row top'>
                <div className='col-2'>
                    <ul>
                        <li>
                            <div className='card card-body'>
                                <h2>Shipping Information</h2>
                                <p>
                                    <strong>Name: </strong> {order.shippingAddress.fullName}<br/>
                                    <strong>Address: </strong>{order.shippingAddress.address}, 
                                    {order.shippingAddress.city}, 
                                    {order.shippingAddress.country}
                                </p>
                                {order.isDelivered
                                    ? <Message variant='success'>Divered at {order.deliveredAt}</Message>
                                    : <Message variant='danger'>Not Delivered</Message>
                                }
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method: </strong> {order.paymentMethod}
                                </p>
                                {order.isPaid
                                    ? <Message variant='success'>Paid at {order.paidAt}</Message>
                                    : <Message variant='danger'>Not Paid</Message>
                                }
                            </div>
                        </li>
                        <li>
                            <div className='card card-body'>
                                <h2>Order Items</h2>
                                <ul>
                                {
                                    order.orderItems.map((item) => 
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
                                    <div>${order.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Shipping</div>
                                    <div>${order.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className='row'>
                                    <div>Order Total</div>
                                    <div>${order.totalPrice}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
