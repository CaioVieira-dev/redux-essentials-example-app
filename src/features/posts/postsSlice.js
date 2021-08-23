
import {createSlice, nanoid, createAsyncThunk} from  '@reduxjs/toolkit'
import {client} from '../../api/client'

const initialState = {
    posts:[],
status:'idle',
error:null
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const response = await client.get('/fakeApi/posts')
    return response.posts
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postAdded:{reducer(state,action){
            state.posts.push(action.payload)
        },
        prepare(title, content, userId){
            return {
                payload: {
                    id: nanoid(), 
                    title, 
                    content,
                    user:userId,
                    date:new Date().toISOString(),
                    reactions:{ thumbsUp: 0,  hooray: 0,  heart: 0,  rocket: 0,  eyes: 0},
                }
            }
        }},
        reactionAdded(state,action){
            const {postId, reaction}= action.payload
            const existingPost = state.posts.find(post=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
        postUpdated(state,action){
            const {id, title, content}= action.payload;
            const existingPost = state.posts.find(post => post.id === id)
            if(existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        }
    },
    extraReducers:{
        [fetchPosts.pending]:(state,action)=>{
            state.status = 'loading'
        },
        [fetchPosts.fulfilled]:(state,action)=>{
            state.status = 'succeeded'
            state.posts = state.posts.concat(action.payload)
        },
        [fetchPosts.rejected]:(state,action) =>{
            state.status = 'failed'
            state.error= action.error.message
        }
    }
})
export const {postAdded,reactionAdded,postUpdated} = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state,postId)=> state.posts.posts.find(post => postId===post.id)