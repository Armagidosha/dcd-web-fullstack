import { checkRes } from "@/app/shared/utils/functions";

export const updateCategory = async (
  categoryId: string,
  categoryName: string,
) => {
  const body = JSON.stringify({ name: categoryName });

  const response = await fetch(`/api/category/${categoryId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body,
  });

  return await checkRes(response);
};

export const deleteCategory = async (categoryId: string) => {
  const response = await fetch(`/api/category/${categoryId}`, {
    method: "DELETE",
  });

  return await checkRes(response);
};
