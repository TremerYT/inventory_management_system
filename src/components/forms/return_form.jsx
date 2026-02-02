import { Button, Col, DatePicker, Form, Input, Row, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { received, taxes } from "../../utils/select_items.js";

const { TextArea } = Input;

const generateRET = () => {
  const code = "RET";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${code}-${randomNumber}`;
};

const ReturnsForm = () => {
  const [returnsForm] = Form.useForm();

  useEffect(() => {
    const number = generateRET();
    returnsForm.setFieldsValue({ referenceNumber: number });
  }, [returnsForm]);

  const handleOnCancel = () => {
    returnsForm.resetFields();
  };

  return (
    <Form form={returnsForm} layout="vertical">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="date"
            label="Return Date"
            rules={[{ required: true, message: "Return date is required" }]}
          >
            <DatePicker
              className="w-full"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: "Product name is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="returnNo"
            label="Return Number"
            rules={[{ required: true }]}
          >
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="supplier"
            label="Supplier"
            rules={[{ required: true, message: "Supplier is required" }]}
          >
            <Select />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="customer"
            label="Customer Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="received"
            label="Return Status"
            rules={[{ required: true, message: "Return status is required" }]}
          >
            <Select options={received} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            name="refund"
            label="Refund Amount"
            rules={[{ required: true, message: "Refund amount is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="paymentMethod"
            label="Payment Method"
            rules={[{ required: true, message: "Payment method is required" }]}
          >
            <Select />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="note"
            label="Return Reason"
            rules={[{ required: true, message: "Reason is required" }]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Col>
      </Row>

      <div className="flex gap-4 justify-end mt-10">
        <Button type="primary" htmlType="submit" size="large">
          Process Return
        </Button>
        <Button type="primary" danger onClick={handleOnCancel} size="large">
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default ReturnsForm;
