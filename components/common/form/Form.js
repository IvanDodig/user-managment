import { Form as AntForm } from "antd";

const Form = ({ children, onSubmit, className, ...props }) => {
  return (
    <AntForm onFinish={onSubmit} className={className} {...props}>
      {children}
    </AntForm>
  );
};

export default Form;
