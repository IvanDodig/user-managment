import { Table } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Button from "../components/common/button/Button";
import FormItem from "../components/common/form-item/FormItem";
import Form from "../components/common/form/Form";
import Input from "../components/common/input/Input";
import Modal from "../components/common/modal/modal";
import Row from "../components/common/row/Row";
import Select from "../components/common/select/Select";
import { usePermissions } from "../hooks/swr/usePermissions";
import {
  deleteUserById,
  getUsersList,
} from "../services/userServices/userServices";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [filters, setFilters] = useState({});
  const [sorter, setSorter] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  // Delete modal
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteConfirmLoading, setIsDeleteConfirmLoading] = useState(false);
  const {
    data: permissions,
    isLoading: isPermissionsLoading,
    error: permissionsError,
  } = usePermissions();

  useEffect(() => {
    setIsLoading(true);
    getUsersList()
      .then(res => {
        let filteredData = res;
        Object.keys(filters).forEach(key => {
          if (filters[key]) {
            filteredData = filteredData.filter(x => {
              return String(x[key])
                .toUpperCase()
                .includes(String(filters[key]).toUpperCase());
            });
          }
        });

        filteredData = filteredData.sort((a, b) => {
          if (sorter.order === "ascend")
            return a[sorter.field].localeCompare(b[sorter.field]);
          if (sorter.order === "descend")
            return b[sorter.field].localeCompare(a[sorter.field]);
          return 0;
        });
        setData(filteredData);
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false));
  }, [pagination, filters, sorter, update]);

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
    setFilters(filters);
    setSorter(sorter);
  };

  const handleFormSubmit = values => {
    handleTableChange(pagination, values, sorter);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleteConfirmLoading(true);
    try {
      await deleteUserById({ userId: deleteId });
      setUpdate(!update);
      setDeleteId(null);
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleteConfirmLoading(false);
    }
  };
  const hadnleDeleteCancel = () => {
    setDeleteId(null);
  };

  const columns = [
    {
      title: "First name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: true,
    },
    {
      title: "Last name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
    },
    {
      title: "Permission",
      dataIndex: "permissionCode",
      key: "email",
      sorter: true,
    },
    {
      title: () => (
        <div className="d-flex space-between">
          <span>Action:</span>
          <Link href="create">New user</Link>
        </div>
      ),
      width: "180px",
      dataIndex: "id",
      key: "id",
      render: value => {
        return (
          <div className="d-flex space-between">
            <Link href={`assign/${value}`}>Asign</Link>
            <Link href={value}>Edit</Link>
            <a onClick={() => setDeleteId(value)}>Delete</a>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Form className="mb-3" onSubmit={handleFormSubmit}>
        <Row>
          <FormItem name="firstName">
            <Input label={"First name"} />
          </FormItem>
          <FormItem name="lastName">
            <Input label={"Last name"} />
          </FormItem>
          <FormItem name="email">
            <Input label={"Email"} />
          </FormItem>
          <FormItem name="username">
            <Input label={"Username"} />
          </FormItem>
          <FormItem name="permissionId">
            <Select
              label="Permission"
              options={permissions}
              loading={isPermissionsLoading}
              error={permissionsError}
              fieldNames={{
                label: "code",
                value: "id",
              }}
            />
          </FormItem>
        </Row>
        <Row gutter={0} justify="end">
          <Button label="Search" htmlType="submit" />
        </Row>
      </Form>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={pagination}
        onChange={handleTableChange}
      />
      <Modal
        title="Delete"
        body="Are you sure you want to delete this user?"
        open={deleteId}
        confirmLoading={isDeleteConfirmLoading}
        onCancel={hadnleDeleteCancel}
        onOk={handleDeleteConfirm}
      />
    </div>
  );
}
