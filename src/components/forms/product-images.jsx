import { Card, Typography, Form, Upload, Row, Col } from 'antd';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const ProductImages = () => {
  const [mainImage, setMainImage] = useState([]);
  const [galleryImage, setGalleryImages] = useState([]);
  const handleMainImageChange = ({ fileList }) => {
    setMainImage(fileList);
  };

  const handleGalleryImageChange = ({ fileList }) => {
    setGalleryImages(fileList);
  };
  return (
    <Row gutter={[16]}>
      <Col span={6}>
        <Card title={<Title level={5}>Main Product Image</Title>}>
          <Form.Item
            name="mainImage"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload at least one image' }]}
          >
            <Upload
              listType="picture-card"
              fileList={mainImage}
              onChange={handleMainImageChange}
              beforeUpload={() => false}
              maxCount={1}
            >
              {mainImage.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Card>
      </Col>
      <Col span={18}>
        <Card title={<Title level={5}>Product Image Gallery</Title>}>
          <Form.Item
            name="galleryImages"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              listType="picture-card"
              fileList={galleryImage}
              onChange={handleGalleryImageChange}
              beforeUpload={() => false}
              multiple
            >
              {galleryImage.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default ProductImages;
