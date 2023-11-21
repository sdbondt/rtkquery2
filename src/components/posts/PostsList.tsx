import { getQueryString, useGetPostsQuery } from '../../services/postsSlice'
import PostItem, { IPost } from './PostItem'
import errorMessage from '../../utils/errorHandler'
import { useSelector } from 'react-redux'

const PostsList = () => {
  const queryString = useSelector(getQueryString)
  const { data: { posts = [] } = {}, isLoading, isFetching, isError, error } = useGetPostsQuery(queryString)
  
  if (isFetching || isLoading) return <p>loading</p>
  if (posts.length === 0) return <p>No posts found</p>
  
  return (
      <div>
      {posts.map((post: IPost) => <PostItem post={post} key={post._id} />)}
      {isError ? <p>{errorMessage(error)}</p> : null}
    </div>
  )
}

export default PostsList 