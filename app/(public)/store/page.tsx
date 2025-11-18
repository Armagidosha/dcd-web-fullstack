import { getProducts } from "@/app/lib/actions/store";
import Latest from "@/app/shared/widgets/Latest/Latest";
import Products from "@/app/shared/widgets/Products/Products";

const DonatePage = async () => {
  const { latest, products, categories } = await getProducts();

  return (
    <>
      <Products products={products} categories={categories} />
      {!!latest.length && <Latest latest={latest} />}
    </>
  );
};

export default DonatePage;
