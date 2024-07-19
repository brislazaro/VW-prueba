import useToDos from "./useToDos";
import { Table } from "antd";
import styles from "./toDosPage.module.css";

const ToDosPage = () => {
  const { isLoading, isError, data } = useToDos();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <p data-testId={"todo-item"}>{title}</p>,
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => {
        return (
          <>
            {completed ? (
              <p className={styles.completed}>Completed</p>
            ) : (
              <p>Not completed</p>
            )}
          </>
        );
      },
    },
  ];

  return (
    <>
      <h2 className={styles.title}>To Do´s Page</h2>

      {isError ? (
        <p className={styles.error}>Error al cargar datos</p>
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          loading={isLoading}
          pagination={{ showSizeChanger: false, position: ["bottomCenter"] }}
        />
      )}
    </>
  );
};
export default ToDosPage;
