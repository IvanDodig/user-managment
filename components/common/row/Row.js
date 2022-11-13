import { Row as AntRow } from "antd";

const Row = ({ gutter = [30, 0], justify, className, children }) => {
  return (
    <AntRow className={className} gutter={gutter} justify={justify}>
      {children}
    </AntRow>
  );
};

export default Row;
