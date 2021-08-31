import React, {useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit'

import {addNewPost} from './postsSlice'
import {selectAllUsers} from '../users/usersSlice'

export const AddPostFrom = ()=>{
    const [title, setTitle] = useState('');
    const [ content, setContent] = useState('');
    const [userId,setUserId]= useState('')
    const [addRequestStatus,setAddRequestStatus]=useState('idle')

    const dispatch = useDispatch();

    const users = useSelector(selectAllUsers);

    const onTitleChanged = e =>setTitle(e.target.value)
    const onContentChanged = e =>setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

  
    const canSave = [title,content,userId].every(Boolean) && addRequestStatus==='idle'

    const onSavePostClicked =async ()=>{
        if(canSave){
            try{
                setAddRequestStatus('pending')
                const resultAction = await dispatch(
                    addNewPost({title,content,user:userId})
                )
                unwrapResult(resultAction)
                setTitle('')
                setContent('')
                setUserId('')
            }catch(e){
                console.error('Failed to save the post: ',e)
            }finally{
                setAddRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user =>(
        <option key={user._id} value={user._id}>{user.name}</option>
    ))

    return(
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" id="postTitle" name="postTitle"
                value={title}
                onChange={onTitleChanged} />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" name="postAuthor" onChange={onAuthorChanged} >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <input type="text" id="postContent" name="postContent"
                value={content} onChange={onContentChanged} />
                <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
            </form>
        </section>
    )

};