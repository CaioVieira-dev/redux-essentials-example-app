import React from 'react';
import {useDispatch} from 'react-redux'
import {deletePost} from './postsSlice'

export function DeleteButton({postId}){
    const dispatch = useDispatch()

    return(
        <button 
        type="button"
        onClick={()=>{
            dispatch(deletePost({id:postId}));
        }}>Remover Post</button>
    )
}