import useAddContent from "../../hooks/useAddContent"
import errorMessage from "../../utils/errorHandler"

const PostForm = () => {
  const {
    content,
    handleContentChanges,
    addContent: addPost,
    addPostError: error,
    addPostIsError: isError,
    addPostIsLoading: isLoading,
  } = useAddContent('Post')
  
  if (isLoading) return <p>loading</p>
  return (
    <fieldset>
      <legend>Add a Post</legend>
      <form onSubmit={addPost}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={content.title}
            onChange={handleContentChanges}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            name="content"
            value={content.content}
            onChange={handleContentChanges}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
      {isError ? <p>{errorMessage(error)}</p> : null}
    </fieldset>
  )
}

export default PostForm
