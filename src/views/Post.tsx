import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostQuery } from '../services/postsSlice'
import errorMessage from '../utils/errorHandler'
import useUserID from '../hooks/useUserID'
import AuthorOptions from '../components/posts/AuthorOptions'
import Comments from '../components/comments/Comments'

const Post = () => {
    const { postID } = useParams()
  const { data: { post = {} } = {}, isLoading, isError, error, isFetching } = useGetPostQuery(postID)
  const userID = useUserID()
  const isAuthor = useMemo(() => {
    return post && post.user ? post.user._id === userID : false
  }, [userID, post])

    useEffect(() => {
        if (!post) document.title = 'No post found'
        else if (!post.user) document.title = 'Post'
        else if (post.user.name) document.title = `Post by ${post.user.name}`
    }, [post])

    if(isLoading || isFetching) return <p>loading</p>
    if(!post) return <p>no post</p>
  return (
      <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          {isAuthor ? <AuthorOptions post={post} />: null}
          {isError ? <p>{errorMessage(error)}</p> : null}
          <Comments />
    </div>
  )
}

export default Post