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

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return item.title.toLowerCase().includes(inputValue.toLowerCase());
    });
  }, [data, inputValue]);

  return {
    isError,
    isLoading,
    data: filteredData,
  };
};
export default usePosts;
