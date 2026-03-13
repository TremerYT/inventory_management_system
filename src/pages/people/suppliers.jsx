import { FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, Card, Input, Modal, Select, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSupplier } from '../../context/supplier/supplier_provider.jsx';
import { createSuppliersColumns } from '../../utils/columns.jsx';
import { status } from '../../utils/select_items.js';

const Suppliers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const { suppliers, isLoading, deleteSuppliers, fetchSuppliers, fetchSuppliersById } =
    useSupplier();
  const navigate = useNavigate();

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesSearch =
      !searchText || (
        (supplier.firstName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (supplier.lastName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (supplier.email?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (supplier.phone?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    const matchesStatus =
      selectedStatus === null || supplier.isActive === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const handleEdit = (record) => {
    navigate(`/suppliers/edit/${record.id}`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this supplier?',
      content: 'This action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => deleteSuppliers(id),
    });
  };

  const suppliersColumns = createSuppliersColumns({ onEdit: handleEdit, onDelete: handleDelete });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">Suppliers</h2>
          <p>Manage Your Suppliers</p>
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
            onClick={() => fetchSuppliers()}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/suppliers/add')}>
            Add Suppliers
          </Button>
        </div>
      </div>

      <Card
        title={
          <Input.Search
            placeholder="Search supplier name, email, phone..."
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
          columns={suppliersColumns}
          dataSource={filteredSuppliers}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  );
};

export default Suppliers;
