import React,{useEffect, useState} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import { signin } from '../actions/userActions';
import Loading from '../Loading';
import Message from '../Message';

export default function SignInScreen(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search
        ? props.location.search.split('=')[1]
        : '/';
        const userSignin = useSelector(state=> state.userSignin);
        const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password))
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
                    <h1>Sign In</h1>
                </div>
                {loading && <Loading></Loading>}
                {error && <Message variant='danger'>{error}</Message>}
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
                    <label />
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        Don't have an account? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create new account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
