import { Button, Card, Input, Select, Table } from "antd";
import {
  FileExcelFilled,
  FilePdfFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { dates, paymentStatus, saleStatus, status } from "../../utils/select_items.js";
import { useState } from "react";
import { salesColumns } from "../../utils/columns.jsx";
import { mockSales } from "../../mock/mock_data.jsx";
import { useNavigate } from "react-router";

const Sales = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();
  const { searchText, filteredData, handleSearch, handleSelect } = useFilter(
    mockSales,
    {
      searchFields: ["customerName", "referenceNumber"],
      selectFields: ["status", "paymentStatus", "date"],
    }
  );

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
          <h2 className="text-2xl">Sales</h2>
          <p>Manage Your Sales</p>
        </div>
        <div className="flex gap-3">
          <Button
            type="text"
            icon={<FilePdfFilled style={{ fontSize: 20, color: "red" }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<FileExcelFilled style={{ fontSize: 20, color: "green" }} />}
            onClick={() => {}}
          />
          <Button
            type="text"
            icon={<ReloadOutlined style={{ fontSize: 20 }} />}
            onClick={() => {}}
          />
        </div>
      </div>

      <Card
        title={
          <Input.Search
            value={searchText}
            onChange={handleSearch}
            className="w-1/4!"
          />
        }
        extra={
          <div className="flex gap-2 w-100">
            <Select
              placeholder="Status"
              options={saleStatus}
              className="w-full!"
              onSelect={(value) => handleSelect("status", value)}
            />
            <Select
              placeholder="Payment Status"
              options={paymentStatus}
              className="w-full!"
              onSelect={(value) => handleSelect("paymentStatus", value)}
            />
            <Select
              placeholder="Sort by Date"
              options={dates}
              className="w-full!"
              onSelect={(value) => handleSelect("date", value)}
            />
          </div>
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={salesColumns}
          dataSource={filteredData}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </>
  );
};

export default Sales;
