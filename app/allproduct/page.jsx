import React from "react";
import Header from "../components/header";
import PopProduct from "../components/populaProducts";
import Footer from "../components/footer";
const Page = () => {
  return (
    <>
      <Header />

      <PopProduct  fgb={'รายการสินค้าทั้งหมด'} allpage={1} listp={20}/>
      <Footer />
    </>
  );
};

export default Page;
