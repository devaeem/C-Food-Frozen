"use client";
import React,{useEffect,useState} from "react";
import { useParams } from "next/navigation";
import Header from "../../components/header";
import Link from "next/link";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import {
 getProductId,
} from "../../../func/productapi";
const Page = () => {
  const params = useParams();
  const { id } = params;

  const [productData, setProductDataData] = useState({});

  useEffect(() => {
   getDataId(id)
 }, [id]);

  const getDataId = (id) => {
   getProductId(id)
     .then((res) => {
       setProductDataData(res.data.product);
     })
     .catch((err) => {
       console.log(err);
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

      <div className="container mx-auto mt-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-r-2 border-stone-200">
              <Image
                className="w-full h-auto object-cover"
                src={productData.image}
                width={150}
                height={150}
                alt="Picture of the author"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h1 className="text-gray-900 font-bold text-4xl mb-4">
                {productData.name}
              </h1>
              <h4 className="text-gray-400 font-semibold text-1xl mb-3">
                รหัสสินค้า: {id}
              </h4>
              <h4 className="text-gray-500 font-semibold text-lg mb-3">
                หมวดหมู่สินค้า:{" "}
                <span>
                  <Chip label={productData.categoryRef?.name} />
                </span>
              </h4>

              <p className="text-gray-600 text-lg mb-6">
                {productData.desc}
              </p>
              <p className="text-gray-900 font-bold text-3xl mb-6">
                ฿{productData.price}
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
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <Link href={`/products/${product.id}`}>
                <div>
                  <img
                    className="w-full h-64 object-cover"
                    src={product.imageUrl}
                    alt={product.name}
                  />
                  <div className="p-4">
                    <h2 className="text-gray-900 font-bold text-xl">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-gray-600">Price: {product.price}</p>
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
