import usePosts from "./usePosts";
import { Table } from "antd";
import styles from "./PostsPage.module.css";
import { Post } from "../../components/Types/Types";

const PostPage = () => {
  const { isLoading, isError, data } = usePosts();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (title: string) => <p data-testId={"post-item"}>{title}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

  const rowClassName = (_: Post, index: number) => {
    return index % 2 === 0 ? styles.rowWhite : styles.rowGray;
  };

  return (
    <>
      <h2 className={styles.title}>Posts Page</h2>

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
export default PostPage;
