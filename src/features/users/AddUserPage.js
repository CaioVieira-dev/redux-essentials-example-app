import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
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
        <div className="flex-separator">

        <Link 
        className="button muted-button"
        onClick={handleCancel}
        to="/users">Cancelar</Link>
        <button
        type="button"
        onClick={handleSave}
        >Cadastrar</button>
        </div>
            </form>
        </section>
    )
}