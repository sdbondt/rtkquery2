import { useGetCommentsQuery } from '../../services/commentsSlice'
import { useParams } from 'react-router-dom'
import errorMessage from '../../utils/errorHandler'
import CommentItem from './CommentItem'
import { IUser } from '../posts/PostItem'

export interface IComment {
    _id: string;
    content: string;
    user: IUser;
}

const CommentsList = () => {
    const { postID } = useParams()
    const { data: { comments = [] } = {}, isLoading, isError, error } = useGetCommentsQuery(postID)

    if (isLoading) return <p>loading</p>
    if(comments.length === 0) return <p>No comments</p>
  return (
      <>
          { comments.map((comment: IComment) => <CommentItem comment={comment} key={comment._id} /> )}
          { isError ? <p>{errorMessage(error)}</p>: null}
      </>
  )
}

export default CommentsList