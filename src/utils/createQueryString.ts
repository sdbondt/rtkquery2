import { PostsState } from "../services/postsSlice";

export const createQueryString = (searchParams: PostsState) => {
    const params = new URLSearchParams();
  
    if (searchParams.q) {
      params.set('q', searchParams.q);
    }
  
    params.set('page', searchParams.page.toString());
    params.set('direction', searchParams.direction);
    params.set('limit', searchParams.limit.toString());
    params.set('sortBy', searchParams.sortBy)
  
    return params.toString() ? `?${params.toString()}` : '';
  }