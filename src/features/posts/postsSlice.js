
import {createSlice, 
     createAsyncThunk,
      createSelector,
    createEntityAdapter} from  '@reduxjs/toolkit'
//import {client} from '../../api/client'
import api from '../../api/axios'
const postsAdapter = createEntityAdapter({
    sortComparer:(a,b)=>b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
status:'idle',
error:null
})
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    //const response = await client.get('/fakeApi/posts')
    const response = await api.get('/get-posts')
   // console.log(response.data)
    //return response.posts
    const arr = response.data.posts.map(p=>{return{...p,id:p._id}})

    return arr
})

export const addNewPost = createAsyncThunk('posts/addNewPost',
async initialPost=>{
    //const response = await client.post('/fakeApi/posts',{post:initialPost})
    console.log(initialPost)
    const json = JSON.stringify(initialPost)
    const response = await api.post('/create-post',json, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      });

    //return response.post
   
    console.log({...response.data.post,id:response.data.post._id})
    return {...response.data.post,id:response.data.post._id}
})

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        reactionAdded(state,action){
            const {postId, reaction}= action.payload
            const existingPost = state.entities[postId]
            if(existingPost){
                existingPost.reactions[0][reaction]++
            }
        },
        postUpdated(state,action){
            const {id, title, content}= action.payload;
            const existingPost = state.entities[id];
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
            console.log(action.payload)
            postsAdapter.upsertMany(state,action.payload)
        },
        [fetchPosts.rejected]:(state,action) =>{
            state.status = 'failed'
            state.error= action.error.message
        },
        [addNewPost.fulfilled]:postsAdapter.addOne
    }
})
export const {reactionAdded,postUpdated} = postsSlice.actions
export default postsSlice.reducer


export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds:selectPostIds,
}= postsAdapter.getSelectors(state=>state.posts)

export const selectPostsByUser = createSelector(
    [selectAllPosts,(state,userId)=>userId],(posts,userId)=>posts.filter(post=>post.user===userId)
)