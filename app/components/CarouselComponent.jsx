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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="p-8 border-r-2 border-stone-200">
      {/* Main Image */}
      <div className="mb-4 w-full h-full">
        <img
           className="w-full h-auto object-cover"
          src={productData.image[mainImageIndex]}
          alt="Main Product Image"
          style={{
            maxWidth: "100%", // ให้รูปภาพไม่เกินความกว้างของ container
            height: "auto", // ให้ความสูงปรับอัตโนมัติตามสัดส่วน
            maxHeight: "300px", // กำหนดความสูงสูงสุดของรูปภาพ
          }}
        />
      </div>

      {/* Slider for Additional Images */}

      <Slider {...settings}>
        {productData.image.map((imgSrc, index) => (
          <div key={index} className="flex-1">
            <img
              className="w-full h-auto object-cover"
              src={imgSrc}
              alt={`Additional Image ${index + 1}`}
              style={{
                maxWidth: "100%", // ให้รูปภาพไม่เกินความกว้างของ container
                height: "auto", // ให้ความสูงปรับอัตโนมัติตามสัดส่วน
                maxHeight: "300px", // กำหนดความสูงสูงสุดของรูปภาพ
              }}
              alt={`Additional Image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
