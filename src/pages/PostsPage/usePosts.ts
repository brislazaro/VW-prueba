import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/postsSlice";
import { RootState } from "../../redux/store";

const usePosts = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, data } = useSelector((state: RootState) => {
    return state.posts;
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return {
    isError,
    isLoading,
    data,
  };
};
export default usePosts;
