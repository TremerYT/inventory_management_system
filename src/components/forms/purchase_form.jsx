import {AutoComplete, Col, DatePicker, Form, Input, Row, Select} from "antd";
import dayjs from "dayjs";
import {useSale} from "../../context/sales_context.jsx";

const {TextArea} = Input;
const generatePUR = () => {
  const code = "PUR";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${code}-${randomNumber}`;
};

const PurchaseForm = () => {
  const [purchaseForm] = Form.useForm();
  const {productOptions, handleOnSearch, handleOnSelect, form} = useSale();
  return (
    <Form layout="vertical" form={form} onFinish={(values) => {
    }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item label="Reference No" name="referenceNumber">
            <Input disabled/>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Date"
            name="date"
            rules={[{required: true, message: "Date is required"}]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Supplier name"
            name="supplierName"
            rules={[{required: true, message: "Customer Name is required"}]}
          >
            <Select options={[]}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.Item
            label="Choose product"
            name="productName"
            rules={[{required: true, message: "Product Name is required"}]}
          >
            <AutoComplete
              options={productOptions}
              onSelect={handleOnSelect}
              onSearch={handleOnSearch}
              filterOption={false}
            >
              <Input.Search size="large" className="w-full"/>
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            label="Shipping"
            name="shipping"
            rules={[{required: true, message: "Shipping Amount is required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Purchase Status"
            name="paid"
            rules={[{required: true, message: "Purchase status is required"}]}
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="Remarks"
            name="remarks"
            rules={[{required: true, message: "Remarks are required"}]}
          >
            <Input.TextArea rows={4}/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PurchaseForm;
