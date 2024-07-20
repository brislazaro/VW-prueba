import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const usePostDetails = (id: string) => {
  const posts = useSelector((state: RootState) => state.posts.data);

  const selectedPost = posts.find((post) => post.id === Number(id));

  console.log(selectedPost);

  return {
    data: selectedPost,
  };
};

export default usePostDetails;
