import {Button, Card, Input, Select, Table} from "antd";
import {FileExcelFilled, FilePdfFilled, PlusOutlined, ReloadOutlined,} from "@ant-design/icons";
import {brands} from "../utils/select_items.js";
import {useState} from "react";
import {createProductColumns} from "../utils/columns.jsx";
import {useNavigate} from "react-router";
import {useProduct} from "../context/product_context.jsx";
import {useCategory} from "../context/category_provider.jsx";
import ProductView from "../components/modal/product_view.jsx";

const AllProducts = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    loading,
    setSelectedCategory,
    setSelectedBrand,
    setSearchText,
    filteredData,
  } = useProduct();
  const {categoryFilter} = useCategory();
  const navigate = useNavigate();

  const handleView = (record) => {
    setModalOpen(true);
    setSelectedProduct(record);
  };

  const handleEdit = (record) => {

  };

  const handleDelete = (record) => {

  };

  const columns = createProductColumns({
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
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
          <h2 className="text-2xl">Product List</h2>
          <p>Manage Your Products</p>
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
          <Button
            type="primary"
            icon={<PlusOutlined/>}
            onClick={() => {
              navigate("/products/add");
            }}
          >
            Add Product
          </Button>
        </div>
      </div>

      <Card
        title={
          <Input.Search
            placeholder="Search product name, SKU, barcode..."
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
            <Select
              placeholder="Brand"
              allowClear
              options={brands}
              className="w-full!"
              onChange={(value) => setSelectedBrand(value)}
            />
          </div>
        }
      >
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredData}
          pagination={{pageSize: 10}}
          loading={loading}
          rowKey="skuNumber"
        />
      </Card>
      <ProductView isModalOpen={isModalOpen} record={selectedProduct}/>
    </>
  );
};

export default AllProducts;
