import useToDos from "./useToDos";
import { Table } from "antd";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { ToDo } from "../../components/Types/Types";

const ToDosPage = () => {
  const { isLoading, isError, data, setData } = useToDos();
  console.log(data);

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
      render: (completed: boolean, rowToDo: ToDo) => {
        const handleCheckboxChange = (e: CheckboxChangeEvent) => {
          const newData = data.map((todo) => {
            if (todo.id === rowToDo.id) {
              return { ...todo, completed: e.target.checked };
            }
            return todo;
          });
          setData(newData);
        };

        return (
          <>
            {completed ? (
              <p>Completed</p>
            ) : (
              <Checkbox onChange={handleCheckboxChange}></Checkbox>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <h2>To Do´s Page</h2>
      <Table dataSource={data} columns={columns} loading={isLoading} />
    </>
  );
};
export default ToDosPage;
