import React, { useMemo } from 'react'
import { CommentItemProps } from './CommentItem'
import useManageContent from '../../hooks/useManageContent'
import errorMessage from '../../utils/errorHandler'

const AuthorOptions: React.FC<CommentItemProps> = ({ comment }) => {
    const { handleUpdate: updateComment,
        deleteContent: deleteComment,
        showUpdateForm,
        updateContent,
        deleteCommentError,
        deleteCommentIsError,
        deleteCommentIsLoading,
        updateCommentError,
        updateCommentIsError,
        updateCommentIsLoading,
        toggleUpdateForm,
        handleContentChanges } = useManageContent('Comment', comment)
    
    const isError = useMemo(() => {
        return deleteCommentIsError || updateCommentIsError
    }, [deleteCommentIsError, updateCommentIsError])

    const error = useMemo(() => {
        if (deleteCommentError) return deleteCommentError
        else if (updateCommentError) return updateCommentError
        else return null
    }, [deleteCommentError, updateCommentError])

    if(deleteCommentIsLoading || updateCommentIsLoading) return <p>loading</p>
    return (
        <>
            <div>
                <button type="button" onClick={deleteComment}>Delete Comment</button>
                <button type="button" onClick={toggleUpdateForm}>Update Comment</button>
            </div>
            {showUpdateForm ? <form onSubmit={updateComment}>
                    <label htmlFor="content">Update content</label>
                    <textarea id="content" value={updateContent.content} onChange={handleContentChanges} name="content" />
                <button type="submit">Update</button>
            </form> : null}
            { isError ? errorMessage(error): null}
      </>
    )
}

export default React.memo(AuthorOptions)