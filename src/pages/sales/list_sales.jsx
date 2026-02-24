import { Card, Input, Select, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomHeader from '../../components/ui/custom_header.jsx';
import { useSale } from '../../context/sales/sales_provider.jsx';
import { createSalesColumns } from '../../utils/columns.jsx';
import { paymentStatus, saleStatus } from '../../utils/select_items.js';

const AllSales = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { sales, isLoading } = useSale();
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const columns = createSalesColumns();

  const navigate = useNavigate();
  return (
    <>
      <CustomHeader
        title={'Sales'}
        subTitle={'Manage Your Sales'}
        buttonText={'Add Sale'}
        handleOnClick={() => navigate('/sales/add')}
      />
      <Card
        title={<Input.Search placeholder="Search customer name" allowClear className="w-1/4!" />}
        extra={
          <div className="flex gap-2 w-80">
            <Select
              placeholder="Payment Status"
              allowClear
              options={paymentStatus}
              className="w-full!"
            />
            <Select placeholder="Sale status" allowClear options={saleStatus} className="w-full!" />
          </div>
        }
      >
        <Table
          pagination={{ pageSize: 10 }}
          rowSelection={rowSelection}
          rowKey="key"
          loading={isLoading}
          columns={columns}
          dataSource={sales}
        />
      </Card>
    </>
  );
};

export default AllSales;
