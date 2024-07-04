import React from "react";
import Header from "./components/header";
import Livepreview from "./components/livepreview";
import PopProduct from "./components/populaProducts";

import Footer from "./components/footer";

export default function Home() {
  return (
    <>
      <Header />

      <Livepreview />
      <div className="h-screen">
      <PopProduct />
      </div>
      <div className="fixed">
      <Footer />
      </div>


    </>
  );
}
