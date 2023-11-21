import useAddContent from '../../hooks/useAddContent'
import errorMessage from '../../utils/errorHandler'

const CommentForm = () => {
  const { content,
    handleContentChanges,
    addContent: addComment,
    addCommentError: error,
    addCommentIsError: isError,
    addCommentIsLoading: isLoading } = useAddContent('Comment')
  
  if(isLoading) return <p>loading</p>
  return (
      <fieldset>
          <legend>Add a Comment</legend>
          <form onSubmit={addComment}>
            <label htmlFor="content">Content:</label>
            <textarea
                name="content"
                value={content.content}
                onChange={handleContentChanges}
            />
        <button type="submit">Add Comment</button>
      </form>
      {isError ? <p>{ errorMessage(error)}</p>: null}
    </fieldset>
  )
}

export default CommentForm