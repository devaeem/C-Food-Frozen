"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "../../components/header";
import Link from "next/link";

import { getProductId, randomProduct } from "../../../func/productapi";
import CarouselComponent from "../../components/CarouselComponent";
const Page = () => {
  const params = useParams();
  const { id } = params;
  const [random, setRandom] = useState([]);

  const { data: listRandomProducts } = useQuery({
    queryKey: ["list-random-product"],
    queryFn: async () => {
      try {
        const res = await randomProduct();
        return res.data.products;
      } catch (err) {
        throw err;
      }
    },
  });

  const { data: listProductGet } = useQuery({
    queryKey: ["list-get-productId-show", { id }],
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

  useEffect(() => {
    resData();
  }, [id]);

  const resData = () => {
    randomProduct()
      .then((res) => {
        setRandom(res.data.products);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const products = [
    {
      id: "1",
      name: "Product 1",
      price: "฿100",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Product 2",
      price: "฿150",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      name: "Product 3",
      price: "฿200",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: "4",
      name: "Product 4",
      price: "฿250",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];
  if (!id) {
    return <div>Loading...</div>; // Handle loading state if needed
  }
  return (
    <>
      <Header />
      <div className="mt-8 md:mt-8 lg:mt-4 mx-auto max-w-7xl">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-8">
            <div>
              <CarouselComponent id={id} />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-gray-900 font-bold text-4xl mb-4">
                {listProductGet?.name}
              </h1>
              <h4 className="text-gray-400 font-semibold text-xl mb-3">
                รหัสสินค้า: {listProductGet?.id}
              </h4>
              <h4 className="text-gray-500 font-semibold text-lg mb-3">
                หมวดหมู่สินค้า:{" "}
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {listProductGet?.Category?.name}
                </span>
              </h4>

              <p className="text-gray-600 text-lg mb-6">
                {listProductGet?.desc}
              </p>
              <p className="text-gray-900 font-bold text-3xl mb-6">
                ฿{listProductGet?.price}
              </p>
              <button className="px-6 py-3 bg-blue-500 text-white text-lg font-bold rounded hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                สนใจสินค้านี้
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <h2 className="text-2xl font-semibold mt-2 py-8">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {listRandomProducts?.map((product) => (
            <div
              key={product?.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link href={`/products/${product?.id}`}>
                <div>
                  <img
                    className="w-full h-64 object-cover"
                    src={product?.images[0]?.url}
                    alt={product?.name}
                  />
                  <div className="p-4">
                    <h2 className="text-gray-900 font-bold text-xl">
                      {product?.name}
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Price: {product?.price}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
