import { Button, Drawer, Form, Result, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import usePostDetails from "./usePostDetails";
import { Input } from "antd";
import style from "./PostDetails.module.css";
import { useDispatch } from "react-redux";
import DrawerSkeleton from "./DrawerSkeleton";
import { LoadingOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { editPost, removePost } from "../../redux/thunks";

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
  const {
    data,
    isLoading,
    isError,
    isErrorEdit,
    isLoadingEdit,
    isErrorRemove,
  } = usePostDetails(id);

  const initialState: FormState = {
    title: data?.title || "",
    body: data?.body || "",
  };

  const [open, setOpen] = useState(true);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>(initialState);

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

  const handleRemove = () => {
    dispatch(removePost(data?.id));
    onClose();
  };

  useEffect(() => {
    setFormState(initialState);
  }, [data]);

  useEffect(() => {
    if (isErrorEdit) {
      toast.error("There has been an error saving the post");
    }
  }, [isErrorEdit]);

  useEffect(() => {
    if (isErrorRemove) {
      toast.error("There has been an error deleting the post");
    }
  }, [isErrorRemove]);

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
            <Button
              type="primary"
              danger
              disabled={isLoadingEdit || data === undefined}
              onClick={handleRemove}
            >
              Delete
            </Button>

            <Button
              type="primary"
              onClick={handleEditOrCancelClick}
              disabled={isLoadingEdit || data === undefined}
            >
              {isEditable ? "Cancel" : "Edit"}
            </Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={!isEditable || formState.title === "" || isLoadingEdit}
              style={{ width: "70px" }}
            >
              {isLoadingEdit ? (
                <Spin indicator={<LoadingOutlined spin />} size="small" />
              ) : (
                "Save"
              )}
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" autoComplete="off">
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
