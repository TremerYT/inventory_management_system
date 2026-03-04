import {Card} from "antd";
import {useParams} from "react-router";
import {useEffect} from "react";
import SupplierForm from "../../components/forms/supplier_form.jsx";
import {useSupplier} from "../../context/supplier/supplier_provider.jsx";

const AddSuppliers = () => {
  const {id} = useParams();
  const {isEditMode, fetchSuppliersById} = useSupplier();

  useEffect(() => {
    if (id) {
      fetchSuppliersById(id);
    }
  }, [id]);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl">{isEditMode ? "Edit Supplier" : "Create Supplier"}</h2>
          <p>{isEditMode ? "Edit and manage your supplier" : "Create and manage your supplier"}</p>
        </div>
      </div>
      <Card>
        <SupplierForm/>
      </Card>
    </>
  );
}

export default AddSuppliers;