import { useDispatch, useSelector } from "react-redux"
import { getSearchParams, setSearchParams } from "../../services/postsSlice"
import { useEffect, useRef, ChangeEvent } from "react"


const PostsFilter = () => {
  const { direction, sortBy, q, limit } = useSelector(getSearchParams)
  const dispatch = useDispatch()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(ref.current) ref.current.focus()
  }, [])

  const handleChanges = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => dispatch(setSearchParams({ [e.target.name]: e.target.value}))
  
  return (
    <form>
      <input
        type="text"
        placeholder="Search for a post"
        name="q"
        value={q}
        onChange={handleChanges}
        ref={ref}
      />
      <select name="direction" value={direction} onChange={handleChanges}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <select name="limit" value={limit} onChange={handleChanges}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      <select name="sortBy" value={sortBy} onChange={handleChanges}>
        <option value="updatedAt">Date</option>
        <option value="title">Title</option>
      </select>
    </form>
  )
}

export default PostsFilter