import React from 'react'
import { useDispatch } from 'react-redux'

import {addReactions} from './postsSlice'

const reactionEmoji = {  thumbsUp: '👍',
  hooray: '🎉',
    heart: '❤️', 
     rocket: '🚀',
       eyes: '👀'}

export const ReactionButtons=({post})=>{
    const dispatch = useDispatch()
    let postReactions = [{...post.reactions[0]}]

    const reactionButtons = Object.entries(reactionEmoji).map(([name,emoji])=>{
        return(
            <button 
            key={name} 
            type="button" 
            className="muted-button reaction-button"
            onClick={()=>{
                postReactions[0][name]=postReactions[0][name]+1
                dispatch(addReactions({id: post.id,reactions:postReactions}))}
                }>
                {emoji} {postReactions[0][name]}
            </button>
        )
    })

    return(<div>{reactionButtons}</div>);
}