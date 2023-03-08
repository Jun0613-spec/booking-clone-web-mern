import Featured from "../components/Featured";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MailList from "../components/MailList";
import Navbar from "../components/Navbar";
import PropertyList from "../components/PropertyList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="flex flex-col items-center gap-7 mt-12">
        <Featured />
        <h1 className="w-full sm:text-xl sm:ml-56">Browse by property type</h1>
        <PropertyList />
        <h1 className="w-full sm:text-xl sm:ml-56">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
