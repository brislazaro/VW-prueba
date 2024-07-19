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

  if (isError) {
    return <p className={styles.error}>Error al cargar datos</p>;
  } else {
    return (
      <>
        <h2 className={styles.title}>To Do´s Page</h2>

        {}
        <Table dataSource={data} columns={columns} loading={isLoading} />
      </>
    );
  }
};
export default ToDosPage;
