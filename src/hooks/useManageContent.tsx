import { useReducer, useState } from "react"
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../services/postsSlice"
import { IPost } from "../components/posts/PostItem"
import { useNavigate } from "react-router-dom"
import { ContentAction, ContentState } from "./useAddContent"
import { useDeleteCommentMutation, useUpdateCommentMutation } from "../services/commentsSlice"
import { IComment } from "../components/comments/CommentsList"

const reducer = (state: ContentState, action: ContentAction) => ({
  ...state,
  ...action,
})

type ContentType = 'Post' | 'Comment'

const useManageContent = (type: ContentType, document: IPost | IComment) => {
  const initialState = type === 'Post' 
    ? { title: (document as IPost).title, content: document.content }
    : { content: document.content }
  const [updateContent, dispatchUpdateContent] = useReducer(reducer, initialState)
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [
    deletePost,
    {
      error: deletePostError,
      isLoading: deletePostIsLoading,
      isError: deletePostIsError,
    },
  ] = useDeletePostMutation()
  const [
    updatePost,
    {
      error: updatePostError,
      isLoading: updatePostIsloading,
      isError: updatePostIsError,
    },
  ] = useUpdatePostMutation()

  const [deleteComment, { error: deleteCommentError, isError: deleteCommentIsError, isLoading: deleteCommentIsLoading }] = useDeleteCommentMutation()
  const [updateComment, { error: updateCommentError, isError: updateCommentIsError, isLoading: updateCommentIsLoading }] = useUpdateCommentMutation()

  const navigate = useNavigate()

  const toggleUpdateForm = () => setShowUpdateForm((val) => !val)
  const handleContentChanges = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => dispatchUpdateContent({ [e.target.name]: e.target.value })

  const deleteContent = async () => {
    if (type === 'Post') {
      await deletePost(document._id)
      navigate("/posts")
    }
    if (type === 'Comment') await deleteComment(document._id)
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(type === 'Post') await updatePost({
      postID: document._id,
      postData: updateContent,
    })

    if (type === 'Comment') await updateComment({
      commentID: document._id,
      commentData: updateContent
    })
    
    toggleUpdateForm()
  }

  return {
    updateContent,
    handleContentChanges,
    toggleUpdateForm,
    deleteContent,
    handleUpdate,
    showUpdateForm,
    deletePostError,
    deletePostIsError,
    deletePostIsLoading,
    updatePostError,
    updatePostIsError,
    updatePostIsloading,
    updateCommentError,
    updateCommentIsError,
    updateCommentIsLoading,
    deleteCommentError,
    deleteCommentIsError,
    deleteCommentIsLoading
  }
}

export default useManageContent
