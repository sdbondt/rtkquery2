import { useReducer } from 'react'
import { useCreatePostMutation } from '../services/postsSlice';
import { useParams } from 'react-router-dom';
import { useCreateCommentMutation } from '../services/commentsSlice';

export interface ContentState {
    title?: string;
    content: string;
}

export interface ContentAction {
    title?: string;
    content?: string;
}

type ContentType = 'Comment' | 'Post';

const emptyState = {
    title: '',
    content: ''
}

const reducer = (state: ContentState, action: ContentAction) => ({
    ...state,
    ...action
})

const useAddContent = (type: ContentType, initialState: ContentState = emptyState) => {
    const [content, dispatchContent] = useReducer(reducer, initialState)
    const [addPost, { error: addPostError, isLoading: addPostIsLoading, isError: addPostIsError }] = useCreatePostMutation()
    const [addComment, {error: addCommentError, isLoading: addCommentIsLoading, isError: addCommentIsError }] = useCreateCommentMutation()
    const params = useParams()

    const handleContentChanges = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatchContent({ [e.target.name]: e.target.value })
    
    const addContent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(type === 'Post') await addPost(content)
        if (type === 'Comment') {
            const { postID } = params
            await addComment({
                postID,
                commentData: content
            })
        }
        dispatchContent(emptyState)
    }
    
    return {
        content,
        handleContentChanges,
        addContent,
        addPostError,
        addPostIsError,
        addPostIsLoading,
        addCommentError,
        addCommentIsError,
        addCommentIsLoading
    }
}

export default useAddContent