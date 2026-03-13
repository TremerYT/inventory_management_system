import {Col, Descriptions, message, Modal, Row, Spin, Table, Tag} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {useSale} from '../../context/sales/sales_provider.jsx';

const saleItemsColumns = [
  {
    title: 'Product Name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Unit Price',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    key: 'discount',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
  {
    title: 'Sub Total',
    dataIndex: 'subTotal',
    key: 'subTotal',
    render: (value) => `ksh${(value || 0).toFixed(2)}`,
  },
];

const SaleView = () => {
  const {isViewModalOpen, selectedSale, closeViewModal, fetchSaleById} = useSale();
  const [saleData, setSaleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchedSaleId = useRef(null);

  useEffect(() => {
    const fetchSaleData = async () => {
      if (isViewModalOpen && selectedSale?.id && selectedSale.id !== fetchedSaleId.current) {
        try {
          setLoading(true);
          const data = await fetchSaleById(selectedSale.id);
          setSaleData(data);
          fetchedSaleId.current = selectedSale.id;
        } catch (error) {
          message.error('Failed to fetch sale details');
          console.error('Error fetching sale:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSaleData();
  }, [isViewModalOpen, selectedSale?.id]);

  // Reset fetched sale ID when modal closes
  useEffect(() => {
    if (!isViewModalOpen) {
      fetchedSaleId.current = null;
      setSaleData(null);
    }
  }, [isViewModalOpen]);

  const saleDescription = [
    {label: 'Reference Number', value: saleData?.referenceNumber},
    {label: 'Date', value: saleData?.date ? new Date(saleData.date).toLocaleDateString() : ''},
    {label: 'Customer Name', value: saleData?.customerName},
    {
      label: 'Sale Status',
      value: saleData?.saleStatus ? (
        <Tag color={saleData.saleStatus === 'completed' ? 'green' : 'volcano'}>
          {saleData.saleStatus}
        </Tag>
      ) : ''
    },
    {
      label: 'Payment Status',
      value: saleData?.paymentStatus ? (
        <Tag color={saleData.paymentStatus === 'completed' ? 'green' : 'volcano'}>
          {saleData.paymentStatus}
        </Tag>
      ) : ''
    },
    {label: 'Shipping', value: saleData?.shipping ? `ksh${Number(saleData.shipping).toFixed(2)}` : 'ksh0.00'},
    {label: 'Grand Total', value: saleData?.grandTotal ? `ksh${Number(saleData.grandTotal).toFixed(2)}` : 'ksh0.00'},
    {label: 'Paid Amount', value: saleData?.paid ? `ksh${Number(saleData.paid).toFixed(2)}` : 'ksh0.00'},
    {
      label: 'Due Amount',
      value: saleData?.grandTotal && saleData?.paid ?
        `ksh${Math.max(0, Number(saleData.grandTotal) - Number(saleData.paid)).toFixed(2)}` :
        'ksh0.00'
    },
    {label: 'Remarks', value: saleData?.remarks},
  ];

  return (
    <Modal
      open={isViewModalOpen}
      width={1000}
      onOk={closeViewModal}
      onCancel={closeViewModal}
      footer={null}
      title="Sale Details"
    >
      {loading ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <Spin size="large"/>
        </div>
      ) : !saleData ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <p>No sale data available</p>
        </div>
      ) : (
        <>
          <Row gutter={24} style={{marginBottom: 24}}>
            <Col span={24}>
              <Descriptions layout="horizontal" column={2} bordered size="small">
                {saleDescription.map((item) => (
                  <Descriptions.Item key={item.label} label={item.label} span={item.label === 'Remarks' ? 2 : 1}>
                    {item.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <h4 style={{marginBottom: 16}}>Sale Items</h4>
              <Table
                columns={saleItemsColumns}
                dataSource={saleData?.items || []}
                rowKey={(record, index) => record.id || index}
                pagination={false}
                size="small"
                scroll={{x: 800}}
              />
            </Col>
          </Row>
        </>
      )}
    </Modal>
  );
};

export default SaleView;
