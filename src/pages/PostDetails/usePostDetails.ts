import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const usePostDetails = (id: string) => {
  const { data, isLoading, isError } = useSelector(
    (state: RootState) => state.posts
  );

  const selectedPost = data.find((post) => post.id === Number(id));

  return {
    data: selectedPost,
    isLoading,
    isError,
  };
};

export default usePostDetails;
