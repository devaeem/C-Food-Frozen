"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image"; // Assuming you are using Next.js Image component

const CarouselComponent = ({ productData }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  if (!productData || !productData.image || productData.image.length === 0) {
    return null; // หรือสามารถแสดงข้อความผิดพลาดหรือโค้ดสำหรับสถานการณ์ที่ไม่มีข้อมูล
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    beforeChange: (current, next) => setMainImageIndex(next),
  };

  return (
    <div className="p-8 border-r-2 border-stone-200">
      {/* Main Image */}
      <div className="mb-4 w-full h-full">
        <img
          className="w-full h-full object-fill"
          src={productData.image[mainImageIndex]}
          alt="Main Product Image"
        />
      </div>

      {/* Slider for Additional Images */}

      <Slider {...settings}>
        {productData.image.map((imgSrc, index) => (
          <div key={index} className="flex-1">
            <Image
              className="w-250 h-250 object-cover"
              src={imgSrc}
              width={250}
              height={250}
              alt={`Additional Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
