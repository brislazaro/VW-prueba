import { Button, Drawer, Form, Space } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePostDetails from "./usePostDetails";
import { Input, Checkbox } from "antd";
import style from "./PostDetails.module.css";

type PostDetailsParams = {
  id: string;
};

const { TextArea } = Input;

const PostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<PostDetailsParams>();
  const { data } = usePostDetails(id || "");

  const [open, setOpen] = useState(true);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 250);
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
            <Button type="primary" onClick={() => setIsEditable(!isEditable)}>
              {isEditable ? "Cancel" : "Edit"}
            </Button>
            <Button
              type="primary"
              onClick={() => setIsEditable(!isEditable)}
              disabled={!isEditable}
            >
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical">
          <div className={style.detailContainer}>
            <Form.Item label="Title" style={{ margin: 0 }} required>
              <Input value={data?.title} disabled={!isEditable} />
            </Form.Item>
            <Form.Item label="Body" style={{ margin: 0 }}>
              <TextArea rows={5} value={data?.body} disabled={!isEditable} />
            </Form.Item>
          </div>
        </Form>
      </Drawer>
    </>
  );
};
export default PostDetails;
