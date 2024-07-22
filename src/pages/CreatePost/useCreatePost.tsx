import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const useCreatePost = () => {
  const { isLoadingCreate, isErrorCreate } = useSelector((state: RootState) => {
    return state.posts;
  });

  return {
    isLoadingCreate,
    isErrorCreate,
  };
};

export default useCreatePost;
