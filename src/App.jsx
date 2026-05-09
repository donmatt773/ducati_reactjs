import { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Showroom from "./components/Showroom";
import BackToTop from "./components/BackToTop";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Routes/AppRouters";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Dealership from "./components/Dealership";

function App() {
  const [selectedBike, setSelectedBike] = useState(null);

  return (
    <>
      <Navbar />
      <Header />
      <Showroom selectedBike={selectedBike} setSelectedBike={setSelectedBike} />
      <BackToTop hide={!!selectedBike} />
      <Services />
      <Dealership />



      <Footer />
    </>
    // <BrowserRouter>
    //   <AppRouter />
    // </BrowserRouter>

  );
}

export default App;
