import PostsList from '../components/posts/PostsList'
import PostForm from '../components/posts/PostForm'
import PostsFilter from '../components/posts/PostsFilter'

const Posts = () => {
  return (
    <>
      <PostForm />
      <PostsFilter />
      <PostsList />
    </>
  )
}

export default Posts