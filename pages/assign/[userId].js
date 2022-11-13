import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../../components/common/button/Button";
import FormItem from "../../components/common/form-item/FormItem";
import Form from "../../components/common/form/Form";
import Row from "../../components/common/row/Row";
import Select from "../../components/common/select/Select";
import { required } from "../../constants/formValidationRules";
import { ApiService } from "../../services/ApiService";
import { getUserById, putUser } from "../../services/userServices/userServices";
import { useEffect } from "react";
import { notification } from "antd";

export async function getServerSideProps({ query }) {
  const data = await getUserById({ userId: query.userId });
  const permissions = await ApiService.GET({ url: "permissions" });

  return {
    props: {
      data: data || null,
      permissions: permissions || null,
    },
  };
}
const Assign = ({ data, permissions }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (data && permissions) return;
    notification.error({
      message: `Error`,
      description: "Error happened while fetching permissions data",
      placement: "top",
    });
    router.push("/");
  }, []);

  const handleFormSubmit = async submitData => {
    try {
      setIsLoading(true);
      await putUser({
        data: {
          ...submitData,
          permissionId: submitData.permission.value,
          permissionCode: submitData.permission.label,
        },
        userId: data.id,
      });
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit permission</h2>

      <Form
        onSubmit={handleFormSubmit}
        initialValues={{
          ...data,
          permission: {
            label: data?.permissionCode,
            value: data?.permissionId,
          },
        }}>
        <Row>
          <FormItem name="permission" rules={[required]}>
            <Select
              label="Permission"
              name="permission"
              options={permissions}
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

export default Assign;
