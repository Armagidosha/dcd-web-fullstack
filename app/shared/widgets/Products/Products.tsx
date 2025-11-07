import ProductCard from "../../ui/ProductCard/ProductCard";

interface ProductsProps {
  products: any[];
}

export default function Products({ products }: ProductsProps) {
  return (
    <section className="section">
      <ul className="grid gap-4 grid-cols-[minmax(14rem,20rem)] justify-center sm:place-items-stretch sm:grid-cols-[repeat(2,minmax(14rem,1fr))] md:grid-cols-[repeat(3,minmax(14rem,1fr))] lg:grid-cols-[repeat(4,minmax(14rem,1fr))] xl:grid-cols-[repeat(5,minmax(14rem,1fr))] ">
        {products.map((el) => (
          <ProductCard
            key={el.id}
            category={el.category}
            name={el.name}
            price={el.price}
            image={el.image}
          />
        ))}
      </ul>
    </section>
  );
}
