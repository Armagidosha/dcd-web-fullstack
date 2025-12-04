import Modal from "@/app/shared/ui/Modal/Modal";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";
import AddProductForm from "../forms/AddProductForm";

interface AddProductModalProps {
  isOpen: boolean;
  categories: CategoryWithCount[];
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
}

const AddProductModal = ({
  isOpen,
  categories,
  onClose,
  onSubmit,
}: AddProductModalProps) => {
  return (
    <Modal
      title="Добавить продукт"
      className="px-4"
      size="xl"
      opened={isOpen}
      onClose={onClose}
    >
      <AddProductForm onSubmit={onSubmit} categories={categories} />
    </Modal>
  );
};

export default AddProductModal;
