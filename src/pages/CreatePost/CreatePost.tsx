import { Button, Drawer, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";

type CreateFormState = {
  title: string;
  body: string;
  userId: string;
};

const initialState = {
  title: "",
  body: "",
  userId: "",
};

const CreatePost = () => {
  const [open, setOpen] = useState(true);
  const [formState, setFormState] = useState<CreateFormState>(initialState);
  const [isTitleTouched, setIsTitleTouched] = useState(false);

  const navigate = useNavigate();

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

  return (
    <Drawer
      open={open}
      onClose={onClose}
      size="large"
      title="Add post"
      placement="right"
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" disabled={formState.title === ""}>
            Save
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
              status={isTitleTouched && formState.title === "" ? "error" : ""}
            />
          </Form.Item>
          <Form.Item label="Body" style={{ margin: 0 }}>
            <TextArea
              rows={5}
              value={formState.body}
              onChange={handleBodyChange}
            />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreatePost;
