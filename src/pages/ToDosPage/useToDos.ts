import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchToDos } from "../../redux/slices/toDosSlice";
import { RootState } from "../../redux/store";

const useToDos = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, toDos } = useSelector((state: RootState) => {
    return state.toDos;
  });

  useEffect(() => {
    dispatch(fetchToDos());
  }, []);

  return {
    isError,
    isLoading,
    data: toDos,
  };
};
export default useToDos;
