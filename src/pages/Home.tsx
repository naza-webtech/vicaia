import Hero from '../components/Hero';
import FeaturedProduct from '../components/FeaturedProduct';
import Bestsellers from '../components/Bestsellers';
import Collections from '../components/Collections';
import About from '../components/About';
import Trust from '../components/Trust';
import Newsletter from '../components/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProduct />
      <Bestsellers />
      <Collections />
      <About />
      <Trust />
      <Newsletter />
    </>
  );
}
