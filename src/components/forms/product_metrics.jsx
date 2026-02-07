import {Card, Col, Form, Input, Row, Select, Typography} from "antd";
import {discounts, discountType, taxType,} from "../../utils/select_items.js";
import {useProduct} from "../../context/product/product_context.jsx";

const {Title} = Typography;
const ProductMetrics = () => {
  const {form} = useProduct();
  const currentTaxType = Form.useWatch("taxType", form);
  const currentDiscountType = Form.useWatch("discountType", form);
  return (
    <Card title={<Title level={5}>Pricing and Stocks</Title>}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[{required: true, message: "Quantity is required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="minStock"
            label="Minimum Stock Level"
            rules={[{required: true, message: "Minimum Stock level is required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="costPrice"
            label="Cost Price"
            rules={[{required: true, message: "Cost Price is required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="unitPrice"
            label="Unit Price"
            rules={[{required: true, message: "Unit price is required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="discountType"
            label="Discont Type"
            rules={[{required: true, message: "Discount Type is required"}]}
          >
            <Select options={discountType}/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="discountValue"
            label="Discount Value"
            rules={[{required: true, message: "Discount Value is required"}]}
          >
            {currentDiscountType === "percentage" ? (
              <Select options={discounts}/>
            ) : (
              <Input/>
            )}
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductMetrics;
