import useToDos from "./useToDos";

const ToDosPage = () => {
  const { isLoading, isError, data } = useToDos();

  return (
    <>
      <h2>To Do´s Page</h2>
    </>
  );
};
export default ToDosPage;
