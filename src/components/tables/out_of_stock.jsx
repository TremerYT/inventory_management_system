import {useProduct} from "../../context/product/product_context.jsx";
import {useCategory} from "../../context/category/category_provider.jsx";
import {useState} from "react";
import {Card, Input, Select, Table} from "antd";
import {outOfStockColumns} from "../../utils/columns.jsx";

const OutOfStockTable = () => {
  const {loadingOutOfStock, setSelectedCategory, setSearchText, outOfStockProducts} = useProduct();
  const {categoryFilter} = useCategory();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedKeys) => {
      setSelectedRowKeys(newSelectedKeys);
    },
  };
  return (
    <Card
      title={
        <Input.Search
          placeholder="Search product name, SKU"
          allowClear
          className="w-1/4!"
          onChange={(e) => setSearchText(e.target.value)}
        />
      }
      extra={
        <div className="flex gap-2 w-80">
          <Select
            placeholder="Category"
            allowClear
            options={categoryFilter}
            className="w-full!"
            onChange={(value) => setSelectedCategory(value)}
          />
        </div>
      }
    >
      <Table
        rowSelection={rowSelection}
        columns={outOfStockColumns}
        dataSource={outOfStockProducts}
        pagination={{pageSize: 10}}
        loading={loadingOutOfStock}
      />
    </Card>
  );
}

export default OutOfStockTable;