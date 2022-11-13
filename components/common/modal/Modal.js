import { Modal as AntModal } from "antd";

const Modal = ({ title, open, onOk, onCancel, confirmLoading, body }) => {
  return (
    <AntModal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      confirmLoading={confirmLoading}>
      {body}
    </AntModal>
  );
};

export default Modal;
