"use client";

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  // const [images, setImages] = useState([]);

  const {
    isPending,
    error,
    data: listImageBanner,
    refetch,
  } = useQuery({
    queryKey: ["list-image-banner"],
    queryFn: async () => {
      try {
        const res = await getBanner();
        return res.data.banner;
      } catch (err) {

        throw err;
      }
    },
  });

  // useEffect(() => {
  //   LoadData();
  // }, []);
  // const LoadData = () => {
  //   getBanner()
  //     .then((res) => {
  //       setImages(res.data.banner);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <div className="mt-7 pt-5 h-full flex items-center justify-center">
        <div className="w-full max-w-[100rem] h-full relative">
          <Carousel className="w-full h-full">
            <CarouselContent className="flex h-full">
              {listImageBanner?.map((data, index) => (
                <CarouselItem key={index} className="flex-grow-0 h-full">
                  <div className="p-1">
                    <Image
                      src={data?.images}
                      alt={`Image`}
                      layout="fit"
                      width={1592}
                      height={488}
                      objectFit="cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full rounded-lg shadow-lg"
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
