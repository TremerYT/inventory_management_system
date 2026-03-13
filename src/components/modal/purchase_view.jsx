import {Col, Descriptions, message, Modal, Row, Spin, Table, Tag} from 'antd';
import {useEffect, useRef, useState} from 'react';
import {usePurchase} from '../../context/purchases/purchases_provider.jsx';

const purchaseItemsColumns = [
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

const PurchaseView = () => {
  const {isViewModalOpen, selectedPurchase, closeViewModal, fetchPurchaseById} = usePurchase();
  const [purchaseData, setPurchaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchedPurchaseId = useRef(null);

  console.log('PurchaseView render - isViewModalOpen:', isViewModalOpen, 'selectedPurchase:', selectedPurchase);

  useEffect(() => {
    const fetchPurchaseData = async () => {
      if (isViewModalOpen && selectedPurchase?.id && selectedPurchase.id !== fetchedPurchaseId.current) {
        try {
          setLoading(true);
          const data = await fetchPurchaseById(selectedPurchase.id);
          setPurchaseData(data);
          fetchedPurchaseId.current = selectedPurchase.id;
        } catch (error) {
          message.error('Failed to fetch purchase details');
          console.error('Error fetching purchase:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPurchaseData();
  }, [isViewModalOpen, selectedPurchase?.id]);

  // Reset fetched purchase ID when modal closes
  useEffect(() => {
    if (!isViewModalOpen) {
      fetchedPurchaseId.current = null;
      setPurchaseData(null);
    }
  }, [isViewModalOpen]);

  const purchaseDescription = [
    {label: 'Reference Number', value: purchaseData?.referenceNumber},
    {label: 'Date', value: purchaseData?.date ? new Date(purchaseData.date).toLocaleDateString() : ''},
    {label: 'Supplier Name', value: purchaseData?.supplierName},
    {
      label: 'Purchase Status',
      value: purchaseData?.purchaseStatus ? (
        <Tag color={purchaseData.purchaseStatus === 'completed' ? 'green' : 'volcano'}>
          {purchaseData.purchaseStatus}
        </Tag>
      ) : ''
    },
    {label: 'Shipping', value: purchaseData?.shipping ? `ksh${Number(purchaseData.shipping).toFixed(2)}` : 'ksh0.00'},
    {label: 'Grand Total', value: purchaseData?.grandTotal ? `ksh${Number(purchaseData.grandTotal).toFixed(2)}` : 'ksh0.00'},
    {label: 'Paid Amount', value: purchaseData?.paid ? `ksh${Number(purchaseData.paid).toFixed(2)}` : 'ksh0.00'},
    {
      label: 'Due Amount',
      value: purchaseData?.grandTotal && purchaseData?.paid ?
        `ksh${Math.max(0, Number(purchaseData.grandTotal) - Number(purchaseData.paid)).toFixed(2)}` :
        'ksh0.00'
    },
    {label: 'Remarks', value: purchaseData?.remarks},
  ];

  return (
    <Modal
      open={isViewModalOpen}
      width={1000}
      onOk={closeViewModal}
      onCancel={closeViewModal}
      footer={null}
      title="Purchase Details"
    >
      {loading ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <Spin size="large"/>
        </div>
      ) : !purchaseData ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <p>No purchase data available</p>
        </div>
      ) : (
        <>
          <Row gutter={24} style={{marginBottom: 24}}>
            <Col span={24}>
              <Descriptions layout="horizontal" column={2} bordered size="small">
                {purchaseDescription.map((item) => (
                  <Descriptions.Item key={item.label} label={item.label} span={item.label === 'Remarks' ? 2 : 1}>
                    {item.value}
                  </Descriptions.Item>
                ))}
              </Descriptions>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <h4 style={{marginBottom: 16}}>Purchase Items</h4>
              <Table
                columns={purchaseItemsColumns}
                dataSource={purchaseData?.items || []}
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

export default PurchaseView;
