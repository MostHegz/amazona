import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions';
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function OrderHistory(props) {
    const orderList = useSelector(state => state.orderList);
    const {loading, error, orders} = orderList;
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(listOrders());
    },[dispatch]);

    const userSignin = useSelector(state => state.userSignin);
    const {userInfo} = userSignin;
    if (!userInfo){
        props.history.push('/signin');
    }
    return (
        <div>
            <h1>Order History</h1>
            {loading
                ? <Loading></Loading>
                : error ? <Message variant='danger'>{error}</Message>
                : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order)=>(
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0,10)}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{
                                        order.isPaid
                                        ? order.paidAt.substring(0,10)
                                        : 'No'
                                    }</td>
                                    <td>{
                                        order.isDelivered
                                        ? order.deliveredAt.substring(0,10)
                                        : 'No'
                                    }</td>
                                    <td>
                                        <button 
                                            type='button' 
                                            className='small'
                                            onClick={() =>{props.history.push(`/order/${order._id}`)}}
                                        >
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
        }
        </div>
    )
}
