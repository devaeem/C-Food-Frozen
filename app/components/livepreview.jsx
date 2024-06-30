"use client";

import React, { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getBanner } from "../../func/banner";
import Image from "next/image";
const Livepreview = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    LoadData();
  }, []);
  const LoadData = () => {
    getBanner()
      .then((res) => {
        setImages(res.data.banner);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="mt-7 pt-5 h-full flex items-center justify-center">
        <div className="w-full max-w-[100rem] h-full">
          <Carousel className="w-full h-full">
            <CarouselContent className="flex h-full">
              {images.map((data, index) => (
                <CarouselItem key={index} className="flex-grow-0 h-full">
                  <div className="p-1 h-full">
                    <Image
                      src={data.image}
                      alt={`Image`}
                      layout="responsive"
                      width={1592}
                      height={488}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 ml-2" />
            <CarouselNext className="absolute right-0 mr-2" />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Livepreview;
