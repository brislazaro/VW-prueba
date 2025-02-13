import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const errorPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
      />
    </>
  );
};
export default errorPage;
