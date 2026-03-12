import { getCategoriesActionPrivate } from "@/lib/actions/category/get-category";
import { getProductsActionPrivate } from "@/lib/actions/product/get-products";
import ProductsWidget from "./products-widget";

export default async function ProductsSection() {
  const products = await getProductsActionPrivate();
  const categories = await getCategoriesActionPrivate();

  return <ProductsWidget products={products} categories={categories} />;
}
