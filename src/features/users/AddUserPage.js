import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {createUser,fetchUsers} from './usersSlice'

export function AddUserPage(){
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()

    function handleCancel(){
        setName('')
        setUsername('')
        history.push('/users')
    }
    function handleSave(){ 
        if(!name||!username){return}
        dispatch(createUser({name,username}))
        dispatch(fetchUsers())
        history.push('/users')
    }

    return(
        <section>
            <form>
                <label htmlFor="name">Nome</label>
        <input 
        type="text" 
        name="name" 
        id="name" 
        value={name} 
        onChange={(e)=>setName(e.target.value)}/>
                <label htmlFor="username">Username</label>
                <input 
        type="text" 
        name="username" 
        id="username" 
        value={username} 
        onChange={(e)=>setUsername(e.target.value)}/>
        <button 
        className="button muted-button"
        type="button"
        onClick={handleCancel}>Cancelar</button>
        <button
        type="button"
        onClick={handleSave}
        >Cadastrar</button>
            </form>
        </section>
    )
}