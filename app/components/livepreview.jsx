import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Livepreview = () => {
  const images = [
    "http://13.215.254.95/modules/ps_imageslider/images/76be18f09ed252906561252d4b3ad912c0cc9fd0_%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B9%84%E0%B8%A5%E0%B8%94%E0%B9%8C_2.png",
    "http://13.215.254.95/modules/ps_imageslider/images/41c953b85feb0538b1bb9c20ec012b59dc260f0a_%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%AA%E0%B9%84%E0%B8%A5%E0%B8%94%E0%B9%8C1.png",
    "https://images.unsplash.com/photo-1595147389795-37094173bfd8?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  return (
    <>
      <div className="   mt-7 pt-5 h-full flex items-center justify-center">
        <div className="w-full max-w-[100rem] h-full">
          <Carousel className="w-full h-full">
            <CarouselContent className="flex h-full">
              {images.map((image, index) => (
                <CarouselItem key={index} className="flex-grow-0 h-full">
                  <div className="p-1 h-full">
                    <img
                      src={image}
                      alt={`Image ${index + 1}`}
                      className="w-[1592px] h-[488px] object-cover  rounded-lg shadow-lg "
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
