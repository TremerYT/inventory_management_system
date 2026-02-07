import {Form, Input, Modal, Switch, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useBrand} from "../../context/brand/brand_provider.jsx";

const AddBrand = ({isOpen, handleCancel, handleOk}) => {
  const {form, isLoading} = useBrand();

  const onFinish = (values) => {
    handleOk(values);
  }
  return (
    <Modal
      title="Add Brand"
      open={isOpen}
      onOk={() => form.submit()}
      okText={"Add Brand"}
      onCancel={handleCancel}
      okButtonProps={{loading: isLoading}}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          name="brandName"
          label="Brand Name"
          rules={[{required: true, message: "Brand is Required"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="brandImage"
          label="Brand Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[
            {required: true, message: "Please upload at least one image"},
          ]}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            maxCount={1}
          >
            <div>
              <PlusOutlined/>
              <div style={{marginTop: 8}}>Upload</div>
            </div>

          </Upload>
        </Form.Item>
        <Form.Item name="isActive" valuePropName="checked">
          <Switch/>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AddBrand;