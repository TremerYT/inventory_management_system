import { Button, Card, Input, Select, Table } from 'antd';
import { FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { status } from '../../utils/select_items.js';
import { useState } from 'react';
import { customersColumns } from '../../utils/columns.jsx';
import { useNavigate } from 'react-router';
import { useCustomer } from '../../context/customer/customer_provider.jsx';

const Customers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { customers, isLoading, fetchCustomers } = useCustomer();
  const navigate = useNavigate();

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      !searchText || (
        (customer.firstName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (customer.lastName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (customer.email?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (customer.phone?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    const matchesStatus =
      selectedStatus === null || customer.isActive === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Customers</h2>
          <p>Manage Your Customers</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="text"
            icon={<FilePdfFilled style={{ fontSize: 20, color: 'red' }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<FileExcelFilled style={{ fontSize: 20, color: 'green' }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<ReloadOutlined style={{ fontSize: 20 }} />}
            onClick={() => fetchCustomers()}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/customers/add')}>
            Add Customer
          </Button>
        </div>
      </div>

      <Card
        title={
          <Input.Search
            placeholder="Search customer name, email, phone..."
            allowClear
            className="w-1/4!"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => setSearchText(value)}
          />
        }
        extra={
          <div className="w-30">
            <Select
              placeholder="Filter by status"
              allowClear
              options={status}
              className="w-full!"
              onChange={(value) => setSelectedStatus(value)}
            />
          </div>
        }
      >
        <Table
          loading={isLoading}
          rowSelection={rowSelection}
          columns={customersColumns}
          dataSource={filteredCustomers}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  );
};

export default Customers;
