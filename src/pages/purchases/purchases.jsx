import {useState} from "react";
import {useNavigate} from "react-router";
import {Button, Card, Input, Select, Table} from "antd";
import {FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined} from "@ant-design/icons";
import {purchasesColumns} from "../../utils/columns.jsx";

const Purchases = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();

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
            className="w-1/4!"
          />
        }
        extra={
          <div className="flex gap-2 w-80">
            <Select
              defaultValue="Category"
              // options={categories}
              className="w-full!"
            />
            <Select
              defaultValue="Brand"
              // options={brands}
              className="w-full!"
            />
          </div>
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={purchasesColumns}
         
          pagination={{pageSize: 10}}
        />
      </Card>
    </>
  );
}
export default Purchases