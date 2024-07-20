import usePosts from "./usePosts";
import { Table, Input, Result, Empty } from "antd";
import styles from "./PostsPage.module.css";
import { Post } from "../../components/Types/Types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PostPage = () => {
  const [inputValue, setInputValue] = useState("");
  const { isLoading, isError, data } = usePosts(inputValue);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a: Post, b: Post) => a.id - b.id,
      render: (title: string) => <p data-testId={"post-item"}>{title}</p>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: Post, b: Post) => a.title.localeCompare(b.title),
    },
  ];

  const rowClassName = (_: Post, index: number) => {
    const rowStyle = index % 2 === 0 ? styles.rowWhite : styles.rowGray;
    return `${styles.row} ${rowStyle}`;
  };
  const { Search } = Input;

  return (
    <>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Posts Page</h2>
        <Search
          placeholder="Search"
          enterButton
          style={{ width: 200 }}
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>

      {isError ? (
        <Result
          status="error"
          title="Error loading posts"
          subTitle="There has been an error loading the posts, please try again later."
        />
      ) : (
        <Table
          dataSource={data}
          columns={columns}
          loading={isLoading}
          pagination={{ showSizeChanger: false, position: ["bottomCenter"] }}
          rowClassName={rowClassName}
          onRow={(record: Post) => {
            return {
              onClick: () => {
                navigate(`/detail/${record.id}`);
              },
            };
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  inputValue.length
                    ? `There are no coincidences with the text ${inputValue}`
                    : "No data"
                }
              />
            ),
          }}
        />
      )}
      <Outlet />
    </>
  );
};
export default PostPage;
