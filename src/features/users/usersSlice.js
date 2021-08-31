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

export const createUser= createAsyncThunk("users/createUser",
async newUser=>{
    const json = JSON.stringify(newUser)
    const response = await api.post('/create-user',json,{
        headers: { 'Content-Type': 'application/json' },
    })

    return response.data
})

export const deleteUser= createAsyncThunk("users/deleteUser",
async userId=>{
    const json = JSON.stringify(userId)
    console.log(json)
    const response = await api.post('/delete-user',json,{
        headers: { 'Content-Type': 'application/json' },
    })
    return {data: response.data,...userId}
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchUsers.fulfilled]:usersAdapter.setAll,
        [createUser.fulfilled]:(state,action)=>{
            if(action.payload._id){
                console.log('user created')
                usersAdapter.addOne(state,action.payload)
            }
        },
        [deleteUser.fulfilled]:(state,action)=>{
            if(action.payload.data.ok===1){
                console.log('user deleted')
                usersAdapter.removeOne(state,action.payload.id)
            }
        }
    }
})

export default usersSlice.reducer

export const {selectAll:selectAllUsers, 
    selectById:selectUserById}=usersAdapter.getSelectors(state=>state.users)