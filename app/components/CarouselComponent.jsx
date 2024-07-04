"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image"; // Assuming you are using Next.js Image component
import { getProductId } from "../../func/productapi";
const CarouselComponent = ({ id }) => {

  const [productData, setProductData] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    getDataId(id);
  }, []);


const getDataId = (id) => {
  getProductId(id)
    .then((res) => {
      setProductData(res.data.product);
    })
    .catch((err) => {
      console.log(err);
    });
};


  if (!productData || !productData.images || productData.images.length === 0) {
    return null;
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
        slidesToShow: 1,
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
    <div className="p-3 border-r-2 border-stone-200">
      {/* Main Image */}
      <div className="mb-4 w-full h-[350px]">
        <Image
          // className="min-w-full h-auto md:w-full lg:w-full xl:w-full object-cover max-w-7xl"
          src={productData.images[mainImageIndex]?.url}
          alt={`Image`}
          layout="fit"
          width={1592}
          height={488}
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>

      {/* Slider for Additional Images */}
      <Slider {...settings}>
        {productData.images.map((imgSrc, index) => (
          <>
            <div key={index} className="flex-1 ">
              <div className="mb-4 w-full h-full">
                <Image
                  className="w-[130] h-[130] rounded-lg shadow-lg"
                  src={imgSrc?.url}
                  width={150}
                  height={150}
                  layout="fit"
                  objectFit="cover"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={`Additional Image ${index + 1}`}
                />
              </div>
            </div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
