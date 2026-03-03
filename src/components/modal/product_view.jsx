import {Carousel, Col, Descriptions, Image, Modal, Row, Spin} from 'antd';
import {useProduct} from '../../context/product/product_context.jsx';

const ProductView = () => {
  const {isModalOpen, selectedProduct, handleOnOk, handleModalCancel, loadingView} = useProduct();
  const productDescription = [
    {label: 'Barcode Number', value: selectedProduct?.barcodeNumber},
    {label: 'SKU Number', value: selectedProduct?.skuNumber},
    {label: 'Product Name', value: selectedProduct?.productName},
    {label: 'Category', value: selectedProduct?.categoryName},
    {label: 'Brand', value: selectedProduct?.brandName},
    {label: 'Description', value: selectedProduct?.description},
    {label: 'Quantity', value: selectedProduct?.quantity},
    {label: 'Cost Price', value: selectedProduct?.costPrice},
    {label: 'Unit Price', value: selectedProduct?.unitPrice},
    {label: 'Discount Value', value: selectedProduct?.discountValue},
    {label: 'Stock Alert', value: selectedProduct?.minStock},
  ];

  return (
    <Modal
      open={isModalOpen}
      width={900}
      onOk={handleOnOk}
      onCancel={handleModalCancel}
      footer={null}
    >
      {loadingView ? (
        <div style={{textAlign: 'center', padding: '50px'}}>
          <Spin size="large"/>
        </div>
      ) : (
        <Row gutter={24}>
          <Col span={14}>
            <Descriptions layout="horizontal" column={1} bordered size="small">
              {productDescription.map((product) => (
                <Descriptions.Item key={product.label} label={product.label}>
                  {product.value}
                </Descriptions.Item>
              ))}
            </Descriptions>
          </Col>

          <Col span={10}>
            <Carousel arrows={true} infinite={false} dotPlacement="bottom">
              {selectedProduct?.galleryImages?.map((image, index) => (
                <div key={index}>
                  <Image
                    width="100%"
                    height={200}
                    src={image}
                    style={{objectFit: 'contain'}}
                    alt="product"
                  />
                </div>
              ))}
            </Carousel>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default ProductView;
