import useToDos from "./useToDos";
import { Table } from "antd";
import styles from "./toDosPage.module.css";
import { Todo } from "../../components/Types/Types";
import { Checkbox } from "antd";

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
              <div className={styles.checkbox}>
                <Checkbox />
              </div>
            )}
          </>
        );
      },
    },
  ];

  const rowClassName = (_: Todo, index: number) => {
    return index % 2 === 0 ? styles.rowWhite : styles.rowGray;
  };

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
          rowClassName={rowClassName}
        />
      )}
    </>
  );
};
export default ToDosPage;
