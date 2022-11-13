import { Form as AntForm } from "antd";
import Col from "../col/col";

const FormItem = ({ children, name, rules = [], ...props }) => {
  return (
    <Col>
      <AntForm.Item name={name} rules={rules} {...props}>
        {children}
      </AntForm.Item>
    </Col>
  );
};

export default FormItem;
