import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useCreatePost = () => {
  const { isLoadingCreate, isErrorCreate, createdPosts } = useSelector(
    (state: RootState) => {
      return state.posts;
    }
  );

  return {
    isLoadingCreate,
    isErrorCreate,
    createdPosts,
  };
};

export default useCreatePost;
