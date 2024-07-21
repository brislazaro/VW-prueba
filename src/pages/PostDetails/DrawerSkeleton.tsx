import { Skeleton } from "antd";

const DrawerSkeleton = () => {
  return (
    <div data-testid="drawerSkeleton">
      <Skeleton active paragraph={{ rows: 5 }} />
    </div>
  );
};

export default DrawerSkeleton;
