import {Button, Card, Input, Select, Table} from "antd";
import {FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined,} from "@ant-design/icons";
import {status} from "../../utils/select_items.js";
import {useState} from "react";
import {suppliersColumn} from "../../utils/columns.jsx";

const Suppliers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

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
          <h2 className="text-2xl">Suppliers</h2>
          <p>Manage Your Suppliers</p>
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
            }}
          />
          <Button type="primary" icon={<PlusOutlined/>} onClick={() => {
          }}>
            Add Supplers
          </Button>
        </div>
      </div>

      <Card
        title={
          <Input.Search
            className="w-1/4!"
          />
        }
        extra={
          <div className="w-30">
            <Select
              placeholder="status"
              className="w-full!"
              options={status}
              allowClear
            />
          </div>
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={suppliersColumn}
          pagination={{pageSize: 10}}
        />
      </Card>
    </>
  );
};

export default Suppliers;
