import React,{useState} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {selectUserById,updateUser,fetchUsers} from './usersSlice'

export function UpdateUser({match}){
    const {userId} =match.params 
    const user = useSelector(state=>selectUserById(state,userId))

    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleCancel(){
        history.push('/users')
    }
    function handleSave(){ 
        if(!name||!username){return}
        dispatch(updateUser({name,username,id:userId}))
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