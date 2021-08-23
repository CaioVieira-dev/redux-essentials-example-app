
import {createSlice, nanoid} from  '@reduxjs/toolkit'
import {sub} from 'date-fns'

const initialState = [
    {id: 1,title: 'First post', 
    content: 'hello',
    reactions:{ thumbsUp: 10,  hooray: 0,  heart: 0,  rocket: 0,  eyes: 0},
    date:sub(new Date(),{minutes:10}).toISOString()},
    {id: 2,
    title: 'Second post', 
    content: 'more text',
    reactions:{ thumbsUp: 0,  hooray: 10,  heart: 0,  rocket: 0,  eyes: 0},
    date:sub(new Date(),{minutes:5}).toISOString()},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        postAdded:{reducer(state,action){
            state.push(action.payload)
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
            const existingPost = state.find(post=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++
            }
        },
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
export const {postAdded,reactionAdded,postUpdated} = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state,postId)=> state.posts.find(post => postId===post.id)