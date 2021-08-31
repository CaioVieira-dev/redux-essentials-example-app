import React from 'react';
import {useDispatch} from 'react-redux'
import {deleteUser}from './usersSlice'
export function DeleteUser(id){
    const dispatch = useDispatch()
    return <button 
    type="button" 
    className="button-delete"
    onClick={()=>{dispatch(deleteUser(id))}}>X</button>
}