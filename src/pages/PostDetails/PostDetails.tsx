import { Button, Drawer, Form, Result, Skeleton, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePostDetails from "./usePostDetails";
import { Input } from "antd";
import style from "./PostDetails.module.css";
import { useDispatch } from "react-redux";
import { editPost } from "../../redux/slices/postsSlice";
import DrawerSkeleton from "./DrawerSkeleton";

type PostDetailsParams = {
  id: string;
};

type FormState = {
  title: string;
  body: string;
};

const { TextArea } = Input;

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id = "" } = useParams<PostDetailsParams>();
  const { data, isLoading, isError } = usePostDetails(id);

  const initialState: FormState = {
    title: data?.title || "",
    body: data?.body || "",
  };

  const [open, setOpen] = useState(true);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>(initialState);

  useEffect(() => {
    setFormState(initialState);
  }, [data]);

  const onClose = () => {
    setOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 250);
  };

  const handleEditOrCancelClick = () => {
    setIsEditable(!isEditable);

    if (isEditable) {
      setFormState(initialState);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, title: e.target.value });
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, body: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(
      editPost({
        title: formState.title,
        body: formState.body,
        id: data?.id,
        userId: data?.userId,
      })
    );
  };

  return (
    <>
      <Drawer
        size="large"
        title="Post Detail"
        placement="right"
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button type="primary" onClick={handleEditOrCancelClick}>
              {isEditable ? "Cancel" : "Edit"}
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!isEditable || formState.title === ""}
            >
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <div className={style.detailContainer}>
            {isError && (
              <Result
                status="error"
                title="Error loading posts"
                subTitle="There has been an error loading the posts, please try again later."
              />
            )}

            {!isError && isLoading && <DrawerSkeleton />}

            {!isError && !isLoading && !data && (
              <Result status="warning" title="There is no post with this id" />
            )}

            {!isError && !isLoading && data && (
              <>
                <Form.Item
                  label="Title (required)"
                  style={{ margin: 0 }}
                  required
                >
                  <Input
                    value={formState.title}
                    disabled={!isEditable}
                    onChange={handleTitleChange}
                    status={formState.title === "" ? "error" : ""}
                  />
                </Form.Item>
                <Form.Item label="Body" style={{ margin: 0 }}>
                  <TextArea
                    rows={5}
                    value={formState.body}
                    disabled={!isEditable}
                    onChange={handleBodyChange}
                  />
                </Form.Item>
              </>
            )}
          </div>
        </Form>
      </Drawer>
    </>
  );
};
export default PostDetails;
