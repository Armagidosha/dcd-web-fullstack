export const hasWindow = () => {
  return typeof window === "object";
};

export const checkRes = async (response: Response) => {
  if (!response.ok) {
    await response.json().then((error) => Promise.reject(error));
  }

  return response.json();
};
