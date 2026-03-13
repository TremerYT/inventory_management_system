import { Card, Input, Select, Table } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import CustomHeader from '../../components/ui/custom_header.jsx';
import { useSale } from '../../context/sales/sales_provider.jsx';
import { createSalesColumns } from '../../utils/columns.jsx';
import { paymentStatus, saleStatus } from '../../utils/select_items.js';
import SaleView from '../../components/modal/sale_view.jsx';

const AllSales = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);
  const [selectedSaleStatus, setSelectedSaleStatus] = useState(null);
  const { 
    sales, 
    isLoading, 
    fetchSales, 
    isViewModalOpen, 
    selectedSale, 
    openViewModal, 
    closeViewModal 
  } = useSale();
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };

  const columns = createSalesColumns(openViewModal);

  const navigate = useNavigate();

  const filteredSales = sales.filter((sale) => {
    const matchesSearch =
      !searchText || (
        (sale.customerName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (sale.invoiceNumber?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    const matchesPaymentStatus =
      !selectedPaymentStatus || sale.paymentStatus === selectedPaymentStatus;
    const matchesSaleStatus =
      !selectedSaleStatus || sale.saleStatus === selectedSaleStatus;
    return matchesSearch && matchesPaymentStatus && matchesSaleStatus;
  });

  return (
    <>
      <CustomHeader
        title={'Sales'}
        subTitle={'Manage Your Sales'}
        buttonText={'Add Sale'}
        handleOnClick={() => navigate('/sales/add')}
      />
      <Card
        title={
          <Input.Search
            placeholder="Search customer name, invoice number..."
            allowClear
            className="w-1/4!"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => setSearchText(value)}
          />
        }
        extra={
          <div className="flex gap-2 w-80">
            <Select
              placeholder="Payment Status"
              allowClear
              options={paymentStatus}
              className="w-full!"
              onChange={(value) => setSelectedPaymentStatus(value)}
            />
            <Select
              placeholder="Sale status"
              allowClear
              options={saleStatus}
              className="w-full!"
              onChange={(value) => setSelectedSaleStatus(value)}
            />
          </div>
        }
      >
        <Table
          pagination={{ pageSize: 10 }}
          rowSelection={rowSelection}
          rowKey="key"
          loading={isLoading}
          columns={columns}
          dataSource={filteredSales}
        />
      </Card>
      <SaleView />
    </>
  );
};

export default AllSales;
