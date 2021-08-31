import React from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectAllUsers} from './usersSlice'
import {DeleteUser} from './DeleteUser'


export const UsersList=()=>{
    const users = useSelector(selectAllUsers)

    const renderedUsers = users.map(user =>(
        <li key={user.id}>
            <div className="flex-separator">
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <div>
            <Link to={`/updateUser/${user.id}`}>Atualizar</Link>
            <DeleteUser id={user.id}/>
            </div>
            </div>
        </li>
    ))

    return(
        <section>
            <div className="flex-separator">
            <h2>Users</h2>
            <Link  to={'/addUser'}>Cadastrar Usuario</Link>
            </div>

            <ul>{renderedUsers}</ul>
        </section>
    )

}