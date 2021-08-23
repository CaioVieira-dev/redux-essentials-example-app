
import {createSlice, nanoid} from  '@reduxjs/toolkit'

const initialState = [
    {id: 1,title: 'First post', content: 'hello'},
    {id: 2,title: 'Second post', content: 'more text'},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postAdded:{reducer(state,action){
            state.push(action.payload)
        },
        prepare(title, content){
            return {
                payload: {
                    id: nanoid(), title, content
                }
            }
        }},
        postUpdated(state,action){
            const {id, title, content}= action.payload;
            const existingPost = state.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    }
})
export const {postAdded,postUpdated} = postsSlice.actions
export default postsSlice.reducer