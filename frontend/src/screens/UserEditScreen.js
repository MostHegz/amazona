import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import Loading from '../components/Loading';
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [isAdmin,setIsAdmin] = useState(false);

    const userDetails = useSelector(state => state.userDetails);
    const {loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.userUpdate);
    const {
        loading: loadingUpdate, 
        error: errorUpdate,
        success: successUpdate,    
    } = userUpdate;

    const dispatch = useDispatch();
    useEffect(() =>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET});
            props.history.push('/userlist')
        }
        if (!user) {
            dispatch(detailsUser(userId));
        }else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    },[dispatch,user,userId,successUpdate,props.history])
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(updateUser({_id: userId, name, email, isAdmin}));
    }
    
    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Edit User {name}</h1>
                    {loadingUpdate && <Loading></Loading>}
                    {errorUpdate && <Message variant='danger'></Message>}
                </div>
                {
                    loading ? <Loading></Loading>
                    : error ? <Message variant='danger'>{errorUpdate}</Message>
                    : 
                    <>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input 
                                id='name' 
                                type='text'
                                placeholder='Enter Name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input 
                                id='email' 
                                type='text'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label htmlFor='isAdmin'>Is Admin</label>
                            <input 
                                id='isAdmin' 
                                type='checkbox'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            ></input>
                        </div>
                        <div>
                            <button type='submit' className='primary'>Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}
