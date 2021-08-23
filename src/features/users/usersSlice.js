import {createSlice} from '@reduxjs/toolkit'

const initialState = [
    {id:'0', name:'Caio Vieira'},
    {id:'1', name:'Apellidos Minimus'},
    {id:'2', name:'Zé dasCouves'}
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{}
})

export default usersSlice.reducer