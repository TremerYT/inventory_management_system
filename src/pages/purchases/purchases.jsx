import {useState} from "react";
import {useNavigate} from "react-router";
import {Button, Card, Input, Table} from "antd";
import {FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {purchasesColumns} from "../../utils/columns.jsx";
import PurchaseView from "../../components/modal/purchase_view.jsx";

import {usePurchase} from "../../context/purchases/purchases_provider.jsx";

const Purchases = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const {purchases, fetchPurchases, isLoading, openViewModal} = usePurchase();
  
  console.log('Purchases component - openViewModal:', typeof openViewModal, 'purchases:', purchases.length);

  const filteredPurchases = purchases.filter((purchase) => {
    const matchesSearch =
      !searchText || (
        (purchase.supplierName?.toLowerCase().includes(searchText.toLowerCase()) || '') ||
        (purchase.referenceNumber?.toLowerCase().includes(searchText.toLowerCase()) || '')
      );
    return matchesSearch;
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
          <h2 className="text-2xl">Purchases</h2>
          <p>Manage Your Purchases</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="text"
            icon={<FilePdfFilled style={{fontSize: 20, color: "red"}}/>}
            onClick={() => {
            }}
          />
          <Button
            type="text"
            icon={<FileExcelFilled style={{fontSize: 20, color: "green"}}/>}
            onClick={() => {
            }}
          />
          <Button
            type="text"
            icon={<ReloadOutlined style={{fontSize: 20}}/>}
            onClick={() => {
              fetchPurchases();
            }}
          />
          <Button type="primary" icon={<PlusOutlined/>} onClick={() => {
            navigate('/purchases/add')
          }}>
            Add Purchase
          </Button>
        </div>
      </div>

      <Card
        title={
          <Input.Search
            placeholder="Search supplier, reference number..."
            allowClear
            className="w-1/4!"
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={(value) => setSearchText(value)}
          />
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={purchasesColumns(openViewModal)}
          dataSource={filteredPurchases}
          loading={isLoading}
          pagination={{pageSize: 10}}
          onRow={(record) => ({
            onClick: () => console.log('Row clicked:', record),
          })}
        />
      </Card>
      
      <PurchaseView />
    </>
  );
}
export default Purchases