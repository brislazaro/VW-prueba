import { Drawer } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostDetails = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);

    setTimeout(() => {
      navigate("/");
    }, 250);
  };

  return (
    <>
      <Drawer
        title="Post Detail"
        placement="right"
        onClose={onClose}
        open={open}
      >
        hola
      </Drawer>
    </>
  );
};
export default PostDetails;
