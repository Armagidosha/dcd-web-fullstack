import Modal from "@shared/ui/Modal";
import type {
  CategoryWithCount,
  ProductsWithCategory,
} from "@shared/utils/types/categories";
import EditProductForm from "../../forms/EditProductForm";

interface EditProductModalProps {
  product: ProductsWithCategory | null;
  field?: string;
  categories: CategoryWithCount[];
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

const EditProductModal = ({
  product,
  field,
  categories,
  onClose,
  onSubmit,
}: EditProductModalProps) => {
  return (
    <Modal
      title="Редактирование"
      className="px-4"
      size="lg"
      opened={!!product}
      onClose={onClose}
    >
      {product && (
        <EditProductForm
          product={product}
          field={field || "name"}
          categories={categories}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  );
};

export default EditProductModal;
