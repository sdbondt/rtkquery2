import React, { useMemo } from 'react'
import { IComment } from './CommentsList'
import AuthorOptions from './AuthorOptions'
import useUserID from '../../hooks/useUserID'

export interface CommentItemProps {
    comment: IComment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const userID = useUserID()
    const isAuthor = useMemo(() => {
        return comment && comment.user ? comment.user._id === userID: false
    }, [comment, userID])
  return (
      <>
          <p>{ comment.user.name }</p>
          <p>{comment.content}</p>
         { isAuthor ? <AuthorOptions comment={comment} />: null}
      </>
  )
}

export default React.memo(CommentItem)