import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/common/button/Button";
import FormItem from "../components/common/form-item/FormItem";
import Form from "../components/common/form/Form";
import Input from "../components/common/input/Input";
import Row from "../components/common/row/Row";
import Select from "../components/common/select/Select";
import { email, minLength, required } from "../constants/formValidationRules";
import { usePermissions } from "../hooks/swr/usePermissions";
import { postUser } from "../services/userServices/userServices";

const Create = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    data: permissions,
    isLoading: isPermissionsLoading,
    error: permissionsError,
  } = usePermissions();

  const handleFormSubmit = async data => {
    try {
      setIsLoading(true);
      await postUser({
        data: {
          ...submitData,
          permissionId: submitData.permission.value,
          permissionCode: submitData.permission.label,
        },
      });
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2>Create user</h2>
      <Form onSubmit={handleFormSubmit}>
        <Row>
          <FormItem name="firstName" rules={[required, minLength(3)]}>
            <Input label={"First name"} />
          </FormItem>
          <FormItem name="lastName" rules={[required]}>
            <Input label={"Last name"} />
          </FormItem>
          <FormItem name="email" rules={[required, email]}>
            <Input label={"Email"} />
          </FormItem>
          <FormItem name="username" rules={[required]}>
            <Input label={"Username"} />
          </FormItem>
          <FormItem name="password" rules={[required]}>
            <Input label={"Password"} type="password" />
          </FormItem>
          <FormItem name="statusId" rules={[required]}>
            <Select
              label="Permission"
              options={permissions}
              loading={isPermissionsLoading}
              error={permissionsError}
              labelInValue
              fieldNames={{
                label: "code",
                value: "id",
              }}
            />
          </FormItem>
        </Row>
        <Row gutter={0} justify="end">
          <Button label="Save" htmlType="submit" loading={isLoading} />
        </Row>
      </Form>
    </div>
  );
};

export default Create;
