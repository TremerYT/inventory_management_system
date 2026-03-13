import {Button, Card, Form, Skeleton} from "antd";
import ProductDetails from "../../components/forms/product_details.jsx";
import ProductMetrics from "../../components/forms/product_metrics.jsx";
import ProductImages from "../../components/forms/product-images.jsx";
import {useProduct} from "../../context/product/product_context.jsx";
import {useParams} from "react-router";
import {useEffect} from "react";


const Product = () => {
  const {
    form,
    handleOnFinish,
    handleOnCancel,
    submitting,
    handleOnUpdate,
    isEditMode,
    fetchProductsById,
    loadingProduct
  } = useProduct();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      fetchProductsById(id);
    }
  }, [id]);

  return (
    <>
      {loadingProduct && id ? (
        <div className="flex flex-col gap-6">
          <Card>
            <Skeleton active paragraph={{rows: 6}}/>
          </Card>
          <Card>
            <Skeleton active paragraph={{rows: 6}}/>
          </Card>
          <Card>
            <Skeleton active paragraph={{rows: 6}}/>
          </Card>
        </div>
      ) : (
        <Form
          layout="vertical"
          form={form}
          onFinish={isEditMode ? handleOnUpdate : handleOnFinish}
        >
          <div className="flex flex-col gap-6">
            <ProductDetails/>
            <ProductMetrics/>
            <ProductImages/>
          </div>
          <div className="flex gap-4 justify-end mt-10">
            <Button type="primary" htmlType="submit" size="large" loading={submitting}>
              {isEditMode ? "Update Product" : "Add Product"}
            </Button>
            <Button type="primary" danger onClick={handleOnCancel} size="large">
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </>
  );
}

export default Product;
