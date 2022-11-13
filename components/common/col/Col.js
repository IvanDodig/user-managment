import { Col as AntCol } from "antd";

const Col = ({ xs = 24, md = 12, lg = 8, flex, className, children }) => {
  return (
    <AntCol xs={xs} md={md} lg={lg} flex={flex} className={className}>
      {children}
    </AntCol>
  );
};

export default Col;
