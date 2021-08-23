import React from 'react'
import {createSlice} from  '@reduxjs/toolkit'

const initialState = [
    {id: 1,title: 'First post', content: 'hello'},
    {id: 2,title: 'Second post', content: 'more text'},
]

const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {}
})

export default postsSlice.reducer