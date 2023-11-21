import React, { useMemo } from 'react'
import useManageContent from '../../hooks/useManageContent'
import { PostItemProps } from './PostItem'
import errorMessage from '../../utils/errorHandler'

const AuthorOptions: React.FC<PostItemProps> = ({ post }) => {
    const { deleteContent: deletePost,
        updateContent,
        handleUpdate: updatePost,
        deletePostError,
        deletePostIsError,
        deletePostIsLoading,
        updatePostError,
        updatePostIsError,
        updatePostIsloading,
        showUpdateForm,
        toggleUpdateForm,
        handleContentChanges } = useManageContent('Post', post)
    
    const isError = useMemo(() => {
        return deletePostIsError || updatePostIsError
    }, [deletePostIsError, updatePostIsError])

    const error = useMemo(() => {
        if (deletePostError) return deletePostError
        else if (updatePostError) return updatePostError
        else return null
    }, [deletePostError, updatePostError])

    
    if (deletePostIsLoading || updatePostIsloading) return <p>loading</p>
    
  return (
      <>
          <div>
              <button type="button" onClick={deletePost}>Delete Post</button>
              <button type="button" onClick={toggleUpdateForm}>Update Post</button>
          </div>
          {showUpdateForm ? <form onSubmit={updatePost}>
              <div>
                  <label htmlFor="title">Update Title</label>
                  <input type="text" id="title" value={updateContent.title} name="title" onChange={handleContentChanges} />
              </div>
              <div>
                  <label htmlFor="content">Update content</label>
                  <textarea id="content" value={updateContent.content} onChange={handleContentChanges} name="content" />
              </div>
              <button type="submit">Update</button>
          </form> : null}
          { isError ? errorMessage(error): null}
    </>
  )
}

export default React.memo(AuthorOptions)