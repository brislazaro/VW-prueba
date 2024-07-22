import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { fetchPosts } from "../../redux/thunks";

const usePosts = (inputValue: string) => {
  const dispatch = useDispatch();

  const { isLoading, isError, data } = useSelector((state: RootState) => {
    return state.posts;
  });

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const dataWithKey = data.map((post) => ({ ...post, key: post.id }));

  const filteredData = useMemo(() => {
    return dataWithKey.filter((item) => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase());
    });
  }, [dataWithKey, inputValue]);

  return {
    isError,
    isLoading,
    data: filteredData,
  };
};
export default usePosts;
