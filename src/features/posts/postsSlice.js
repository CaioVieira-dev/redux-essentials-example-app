
import {createSlice} from  '@reduxjs/toolkit'

const initialState = [
    {id: 1,title: 'First post', content: 'hello'},
    {id: 2,title: 'Second post', content: 'more text'},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postAdded(state,action){
            state.push(action.payload)
        }
    }
})
export const {postAdded} = postsSlice.actions
export default postsSlice.reducer