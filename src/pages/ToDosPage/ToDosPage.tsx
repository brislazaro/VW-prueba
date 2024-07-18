import useToDos from "./useToDos";
import { Table } from "antd";

const ToDosPage = () => {
  const { isLoading, isError, data } = useToDos();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => {
        return (
          <>{completed ? <p>Completed</p> : <button>Complete task</button>}</>
        );
      },
    },
  ];

  return (
    <>
      <h2>To Do´s Page</h2>
      <Table dataSource={data} columns={columns} />
    </>
  );
};
export default ToDosPage;
