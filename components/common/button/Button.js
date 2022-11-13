import { Button as AntButton } from "antd";
import styles from "./Button.module.css";

const Button = ({ label, htmlType, onClick, type = "primary", loading }) => {
  return (
    <AntButton
      loading={loading}
      size="large"
      className={styles["button_" + type]}
      htmlType={htmlType}
      onClick={onClick}
      type={type}>
      {label}
    </AntButton>
  );
};

export default Button;
