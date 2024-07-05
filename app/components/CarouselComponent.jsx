"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image"; // Assuming you are using Next.js Image component
import { getProductId } from "../../func/productapi";
const CarouselComponent = ({ id }) => {
  const [productData, setProductData] = useState({});
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const { data: listProductImageGet } = useQuery({
    queryKey: ["list-get-imagePro-show", { id }],
    queryFn: async () => {
      try {
        const res = await getProductId(id);
        return res.data.product;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
  });

  if (
    !listProductImageGet ||
    !listProductImageGet.images ||
    listProductImageGet.images.length === 0
  ) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
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
          src={listProductImageGet?.images[mainImageIndex]?.url}
          alt={`Image`}
          layout="fit"
          width={1592}
          height={488}
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>
      <Slider {...settings}>
        {listProductImageGet.images.map((imgSrc, index) => (
          <div key={imgSrc?.id} className="flex-1 gap-4">
            {listProductImageGet.images.length > 2 && (
              <div className="mb-4 w-full h-full">
                <Image
                  className="w-[50] h-[30] rounded-lg shadow-lg"
                  src={imgSrc?.url}
                  width={150}
                  height={150}
                  layout="fit"
                  objectFit="cover"
                  alt={`Additional Image ${index + 1}`}
                />
              </div>
            )}

          </div>
        ))}
      </Slider>

    </div>
  );
};

export default CarouselComponent;
