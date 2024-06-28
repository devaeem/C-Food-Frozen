import React from "react";

const PopProduct = () => {
  return (
    <>
      <div className="container mx-auto mt-7 py-12">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold">สินค้ายอดนิยม</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="card bg-white shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Product 1"
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">Product 1</h2>
            <p className="mt-1">รายละเอียดสินค้า 1</p>
          </div>
          <div className="card bg-white shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Product 2"
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">Product 2</h2>
            <p className="mt-1">รายละเอียดสินค้า 2</p>
          </div>
          <div className="card bg-white shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Product 3"
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">Product 3</h2>
            <p className="mt-1">รายละเอียดสินค้า 3</p>
          </div>
          <div className="card bg-white shadow-md p-4">
            <img
              src="https://via.placeholder.com/150"
              alt="Product 4"
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold mt-2">Product 4</h2>
            <p className="mt-1">รายละเอียดสินค้า 4</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopProduct;
