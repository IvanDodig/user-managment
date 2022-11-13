import { Select as AntSelect } from "antd";

const defaultFieldNames = {
  label: "value",
  value: "key",
};
const Select = ({
  label,
  options,
  loading,
  error,
  onChange,
  fieldNames = defaultFieldNames,
  allowClear = false,
  ...props
}) => {
  const required = props["aria-required"];
  return (
    <>
      <label>
        {" "}
        {required && <span className="color-red">*</span>} {label}
      </label>
      <AntSelect
        size="large"
        allowClear={allowClear}
        options={options}
        fieldNames={fieldNames}
        loading={loading}
        disabled={loading}
        status={error ? "error" : ""}
        placeholder={"Choose"}
        onChange={onChange}
        {...props}
      />
    </>
  );
};

export default Select;
