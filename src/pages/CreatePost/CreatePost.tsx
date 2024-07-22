import { Button, Drawer, Form, Input, Space, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { useDispatch } from "react-redux";
import { createPost } from "../../redux/thunks";
import { CreatePostReq } from "../../components/Types/Types";
import useCreatePost from "./useCreatePost";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";

type CreateFormState = {
  title: string;
  body: string;
};

const initialState = {
  title: "",
  body: "",
};

const CreatePost = () => {
  const [open, setOpen] = useState(true);
  const [formState, setFormState] = useState<CreateFormState>(initialState);
  const [isTitleTouched, setIsTitleTouched] = useState(false);

  const { isLoadingCreate, isErrorCreate } = useCreatePost();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    setOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 250);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, title: e.target.value });
  };

  const handleTitleBlur = () => {
    setIsTitleTouched(true);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({ ...formState, body: e.target.value });
  };

  const handleSubmit = () => {
    const createPostPayload: CreatePostReq = {
      ...formState,
      userId: Math.floor(Math.random() * 10) + 1,
    };

    dispatch(createPost(createPostPayload));
  };

  useEffect(() => {
    if (isErrorCreate) {
      toast.error("There has been an error creating the post");
    }
  }, [isErrorCreate]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="large"
      title="Add post"
      placement="right"
      extra={
        <Space>
          <Button onClick={onClose} disabled={isLoadingCreate}>
            Cancel
          </Button>
          <Button
            type="primary"
            disabled={formState.title === "" || isLoadingCreate}
            onClick={handleSubmit}
            style={{ width: "70px" }}
          >
            {isLoadingCreate ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : (
              "Save"
            )}
          </Button>
        </Space>
      }
    >
      <Form layout="vertical">
        <div className={styles.formContainer}>
          <Form.Item label="Title (required)" style={{ margin: 0 }} required>
            <Input
              value={formState.title}
              onChange={handleTitleChange}
              onBlur={handleTitleBlur}
              disabled={isLoadingCreate}
              status={isTitleTouched && formState.title === "" ? "error" : ""}
            />
          </Form.Item>
          <Form.Item label="Body" style={{ margin: 0 }}>
            <TextArea
              rows={5}
              value={formState.body}
              disabled={isLoadingCreate}
              onChange={handleBodyChange}
            />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreatePost;
