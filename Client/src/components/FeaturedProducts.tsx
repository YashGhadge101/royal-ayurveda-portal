import { motion } from "framer-motion";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
    return (
        <section className="bg-zinc-950 py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                
                <div className="mb-16 flex flex-col items-center justify-between gap-6 sm:flex-row">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Featured Products
                        </h2>
                        <p className="mt-4 text-lg text-zinc-400">
                            Our highest-rated picks for your everyday wellness.
                        </p>
                    </div>
                    {/* Royal Theme Accent Link */}
                    <a href="/products" className="hidden font-semibold text-purple-400 transition-colors hover:text-fuchsia-400 hover:underline sm:block">
                        View All Products &rarr;
                    </a>
                </div>

                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {products.slice(0, 3).map((product) => (
                        <motion.div 
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, scale: 0.95 },
                                show: { opacity: 1, scale: 1 }
                            }}
                        >
                            {/* The ProductCard itself will need the dark theme applied next! */}
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-10 text-center sm:hidden">
                    <a href="/products" className="font-semibold text-purple-400 transition-colors hover:text-fuchsia-400 hover:underline">
                        View All Products &rarr;
                    </a>
                </div>

            </div>
        </section>
    );
};

export default FeaturedProducts;