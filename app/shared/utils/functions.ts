export const hasWindow = () => {
  return typeof window === "object";
};

export const checkRes = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || error.message || "Unexpected error");
  }

  return response.json();
};
