import React,{useEffect, useState} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import {register} from '../actions/userActions'
import Loading from '../components/Loading';
import Message from '../components/Message';

export default function RegisterScreen(props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
        const userRegister = useSelector(state=> state.userRegister);
        const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password does not match with the confirmed password')
        }else{
            dispatch(register(name, email,password))
        }
    };

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    },[userInfo,props.history,redirect]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Register</h1>
                </div>
                {loading && <Loading></Loading>}
                {error && <Message variant='danger'>{error}</Message>}
                <div>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        placeholder='Enter Name' 
                        required 
                        onChange={e=> setName(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input 
                        type='email' 
                        id='email' 
                        placeholder='Enter Email' 
                        required 
                        onChange={e=> setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        placeholder='Enter Password' 
                        required 
                        onChange={e=> setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input 
                        type='password' 
                        id='confirmPassword' 
                        placeholder='Confirm Password' 
                        required 
                        onChange={e=> setConfirmPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button className='primary' type='submit'>Register</button>
                </div>
                <div>
                    <label />
                    <div>
                        Already have an account? {' '}
                        <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
