import { Input as AntInput } from "antd";

const inputTypes = {
  basic: props => <AntInput {...props} />,
  password: props => <AntInput.Password {...props} />,
};

const Input = ({ label, onChange, type = "basic", ...props }) => {
  const required = props["aria-required"];
  return (
    <>
      <label className="form-input-label">
        {required && <span className="color-red">*</span>} {label}
      </label>
      {inputTypes[type]({
        size: "large",
        onChange: onChange,
        placeholder: `Enter ${label.toLowerCase()}`,
        ...props,
      })}
    </>
  );
};

export default Input;
