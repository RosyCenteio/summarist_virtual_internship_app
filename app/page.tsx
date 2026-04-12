import Image from "next/image";
import Navbar from "./component/Navbar";
import Landing from "./component/Landing";
import Feature from "./component/Feature";
import Reviews from "./component/Reviews";
import Numbers from "./component/Numbers";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Landing />
      <Feature />
      <Reviews />
      <Numbers />
      <Footer />
    </div>
  );
}
