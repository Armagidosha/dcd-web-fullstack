import { getProducts } from "./actions/product";
import Latest from "./widgets/Latest";
import Products from "./widgets/Products";

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
