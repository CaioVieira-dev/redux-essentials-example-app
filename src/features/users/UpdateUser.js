import React,{useState} from 'react';
import {useHistory,Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {selectUserById,updateUser,fetchUsers} from './usersSlice'

export function UpdateUser({match}){
    const {userId} =match.params 
    const user = useSelector(state=>selectUserById(state,userId))

    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const dispatch = useDispatch()
    const history = useHistory()

   
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
        <div className="flex-separator">

        <Link 
        className="button muted-button"
        to='/users'>Cancelar</Link>
        <button
        type="button"
        onClick={handleSave}
        >Cadastrar</button>
        </div>
            </form>
        </section>
    )
}