import { createSlice, createAsyncThunk,createEntityAdapter } from '@reduxjs/toolkit'
//import { client } from '../../api/client'
import api from '../../api/axios'

const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

export const fetchUsers= createAsyncThunk('users/fetchUsers',async ()=>{
    //const response = await client.get('/fakeApi/users')
    //console.log(response.users);
    //return response.users
    const response = await api.get('/get-users')
    const arr = response.data.map(u=>{return{...u,id:u._id}})
    console.log(arr)
    return arr
    
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchUsers.fulfilled]:usersAdapter.setAll
    }
})

export default usersSlice.reducer

export const {selectAll:selectAllUsers, 
    selectById:selectUserById}=usersAdapter.getSelectors(state=>state.users)