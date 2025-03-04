import React,{useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {PostAuthor} from './PostAuthor'
import {TimeAgo} from './TimeAgo'
import { ReactionButtons } from './ReactionButtons'
import {DeleteButton}from './DeletePostButton'
import {  
    fetchPosts,  
    selectPostIds,  
    selectPostById} from './postsSlice'

let PostExcerpt =({postId})=>{
   const post = useSelector((state)=>selectPostById(state,postId))
    return(
<article className='post-excerpt' key={post.id}>
            <h3>{post.title}</h3>
            <div>
            <PostAuthor userId={post.user}/>
            <TimeAgo timestamp={post.date}/>
            </div>
            <p className= 'post-content'>{post.content.substring(0,100)}</p>
            <ReactionButtons post={post} />
            <div className= 'flex-separator'>

            <Link to={`/posts/${post.id}`} className="button muted-button">
                View Post
            </Link>
        <DeleteButton postId={post.id} />
            </div>
        </article>
    )
}
PostExcerpt = React.memo(PostExcerpt)

export const PostsList = ()=>{
    const dispatch = useDispatch()
    const orderedPostsIds = useSelector(selectPostIds)
   

    const postStatus = useSelector(state=>state.posts.status)
    const error = useSelector(state=>state.posts.error)

    useEffect(()=>{ 
        if(postStatus ==='idle'){
            dispatch(fetchPosts())
        }
    },[postStatus,dispatch]);

    let content

    if(postStatus==='loading'){
        content = <div className="loader">Loading...</div>
    }else if(postStatus==='succeeded'){
       
        content = orderedPostsIds.map(postId=><PostExcerpt key={postId} postId={postId} />)
    }else if(postStatus==='failed'){
        content = <div>{error}</div>
    }


  
    return(
        <section className='posts-list'>
            <h2>Posts</h2>
            {content}
        </section>
    )
}