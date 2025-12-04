import Modal from "@/app/shared/ui/Modal/Modal";
import type { CategoryWithCount } from "@/app/shared/utils/types/categories";
import EditCategoryForm from "../forms/EditCategoryForm";

interface EditCategoryModalProps {
  category: CategoryWithCount | null;
  categories: CategoryWithCount[];
  onClose: () => void;
  onSubmit: (data: string) => Promise<void>;
}

const EditCategoryModal = ({
  category,
  categories,
  onClose,
  onSubmit,
}: EditCategoryModalProps) => {
  return (
    <Modal
      title="Редактирование категории"
      className="px-4"
      size="md"
      opened={!!category}
      onClose={onClose}
    >
      {category && (
        <EditCategoryForm
          categories={categories}
          category={category}
          onSubmit={onSubmit}
        />
      )}
    </Modal>
  );
};

export default EditCategoryModal;
