import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentScreen(props) {
    const cart =useSelector(state => state.cart);
    const {shippingAddress} = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler=(e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div><h1>Payment Method</h1></div>
                <div><h2>Don't share your payment info. This is just a clone</h2></div>
                <div>
                    <div>
                        <input 
                            type='radio'
                            id='whenDelivered'
                            value='WhenDelivered'
                            name='paymentMethod'
                            required 
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='whenDelivered'>Pay on Delivery</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input 
                            type='radio'
                            id='creditCard'
                            value='CreditCard'
                            name='paymentMethod'
                            required 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor='creditCard'>Credit Card</label>
                    </div>
                </div>
                <div>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            
            </form>
        </div>
    )
}
