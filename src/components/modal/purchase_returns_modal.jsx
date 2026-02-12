import {AutoComplete, Col, DatePicker, Form, Input, Modal, Row, Select} from "antd";
import dayjs from "dayjs";
import {useEffect} from "react";
import {usePurchase} from "../../context/purchases/purchases_provider.jsx";

const generateRef = () => {
  return `PRET-${Date.now().toString().slice(-6)}`;
};

const PurchaseReturnsModal = ({isModalOpen}) => {
  const {form, productOptions, handleOnSelect, handleOnSearch, handleOnCancel} = usePurchase();

  useEffect(() => {
    if (form) {
      const number = generateRef();
      form.setFieldsValue({referenceNumber: number});
    }
  }, [form, isModalOpen]);

  return (
    <Modal open={isModalOpen} width={1200} footer={null} onCancel={handleOnCancel}>
      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Form.Item
              name="supplierName"
              label="Supplier Name"
              rules={[{required: true, message: "Supplier Name is required"}]}
            >
              <Select
                options={[]}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="date"
              label="Date"
              rules={[{required: true, message: "Date is required"}]}
            >
              <DatePicker
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")}
                className="w-full"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Reference No"
              name="referenceNumber"
            >
              <Input disabled/>
            </Form.Item>
          </Col>
        </Row>
        <Row>
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
      </Form>
    </Modal>
  );
}

export default PurchaseReturnsModal;