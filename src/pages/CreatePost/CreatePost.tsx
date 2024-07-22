import { Button, Drawer, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const onClose = () => {
    setOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 250);
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
          <Button>Cancel</Button>
          <Button type="primary">Save</Button>
        </Space>
      }
    >
      it works
    </Drawer>
  );
};

export default CreatePost;
