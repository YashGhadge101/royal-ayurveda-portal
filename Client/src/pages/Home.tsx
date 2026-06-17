import { motion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import Categories from "../components/Categories";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // THE FIX: Set background to black to match the theme
      className="min-h-screen bg-black"
    >
      <Hero />
      <Categories />
      <FeaturedProducts />
      <WhyChooseUs />
    </motion.div>
  );
};

export default Home;