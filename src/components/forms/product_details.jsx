import {Button, Card, Col, Form, Input, Row, Select, Space, Typography,} from "antd";
import {units} from "../../utils/select_items.js";
import AddCategory from "../modal/add_category.jsx";
import {useCategory} from "../../context/category_provider.jsx";
import {useProductDetails} from "../../context/product_details_context.jsx";

const {Title} = Typography;
const {TextArea} = Input;

const ProductDetails = () => {
  const {categoryOptions, isLoading, fetchCategories, addCategory} =
    useCategory();
  const {barcodeValue, barcodeRef, generateBarcode, generateSKU} =
    useProductDetails();

  const handleOnOk = async (values) => {
    const success = await addCategory(values);
    if (success) {
      setIsModalOpen(false);
    }
  };

  return (
    <Card title={<Title level={5}>Product Information</Title>}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="skuNumber"
            label="SKU"
            rules={[{required: true, message: "SKU is Required"}]}
          >
            <Input disabled placeholder={generateSKU()}/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="barcodeNumber"
            label="Barcode"
            rules={[{required: true, message: "Barcode is required"}]}
          >
            <Space.Compact style={{width: "100%"}}>
              <Input disabled placeholder={barcodeValue}/>
              <Button type="primary" onClick={generateBarcode}>
                Generate
              </Button>
            </Space.Compact>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{required: true, message: "Product is Required"}]}
          >
            <Input onChange={(e) => generateSKU(e.target.value)}/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label="Category" required>
            <Space.Compact style={{width: "100%"}}>
              <Form.Item
                name="categoryId"
                noStyle
                rules={[{required: true, message: "Category is Required"}]}
              >
                <Select
                  options={categoryOptions}
                  loading={isLoading}
                  placeholder="Select category"
                />
              </Form.Item>

              <Button type="primary" onClick={() => setIsModalOpen(true)}>
                +
              </Button>
            </Space.Compact>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="brand"
            label="Brand"
            rules={[{required: true, message: "Brand is Required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="unit"
            label="Product Unit"
            rules={[{required: true, message: "Product unit is Required"}]}
          >
            <Select options={units}/>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{required: true, message: "Description is Required"}]}
          >
            <TextArea rows={7}/>
          </Form.Item>
        </Col>
      </Row>

      {barcodeValue && (
        <Row>
          <Col span={24} style={{textAlign: "center", marginBottom: 16}}>
            <svg ref={barcodeRef}/>
          </Col>
        </Row>
      )}

      <AddCategory
        isOpen={isModaLOpen}
        handleCancel={() => setIsModalOpen(false)}
        handleOk={handleOnOk}
        loading={isLoading}
      />
    </Card>
  );
};

export default ProductDetails;
