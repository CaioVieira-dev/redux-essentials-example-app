import React from 'react';
import {useDispatch} from 'react-redux'
import {deleteUser}from './usersSlice'
export function DeleteUser(id){
    const dispatch = useDispatch()
    return <button 
    type="button" 
    onClick={()=>{dispatch(deleteUser(id))}}>X</button>
}