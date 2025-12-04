import { checkRes } from "@/app/shared/utils/functions";

export const postProduct = async (formData: FormData) => {
  const response = await fetch("/api/product", {
    method: "POST",
    body: formData,
  });

  return await checkRes(response);
};

export const updateProduct = async (productId: string, formData: FormData) => {
  const response = await fetch(`/api/product/${productId}`, {
    method: "PATCH",
    body: formData,
  });

  return await checkRes(response);
};

export const deleteProduct = async (productId: string) => {
  const response = await fetch(`/api/product/${productId}`, {
    method: "DELETE",
  });

  return await checkRes(response);
};
