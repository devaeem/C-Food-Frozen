"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../func/productapi";
import { getCategories } from "../../func/api";
import { useRouter } from "next/navigation";
import Pagination from "@mui/material/Pagination";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "next/link";
import debounce from "lodash/debounce";
const PopProduct = ({ fgb, allpage, listp }) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryRef, setCategoryRef] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const [pageCate, setPageCate] = useState(1);
  const [pageSizeCate, setPageSizeCate] = useState(10);
  const [searchCate, setSearchCate] = useState("");
  const [totalPagesCate, setTotalPagesCate] = useState(1);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const {
    isPending,
    error,
    data: listAllProducts,
    refetch,
  } = useQuery({
    queryKey: ["list-all-product", { search, page, pageSize, categoryId }],
    queryFn: async () => {
      try {
        const res = await getProduct(
          search,
          page,
          listp ? listp : pageSize,
          categoryId
        );

        setTotalPages(res.data.totalPages);
        setLoading(false);
        return res.data.products;
      } catch (err) {
        throw err;
      }
    },
  });

  const { data: listAllCategories } = useQuery({
    queryKey: ["list-all-categories", { searchCate, pageCate, pageSizeCate }],
    queryFn: async () => {
      try {
        const res = await getCategories(searchCate, pageCate, pageSizeCate);
        setTotalPages(res.data.totalPages);
        setLoading(false);
        return res.data.category;
      } catch (err) {
        throw err;
      }
    },
  });

  const handleSearchChange = debounce((value) => {
    setSearch(value);
  }, 900);

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    handleSearchChange(value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const truncate = (str, num) => {
    return str.length > num ? str.slice(0, num) + "..." : str;
  };

  return (
    <>
      <div className="container mx-auto mt-7 py-12">
        <div className="flex items-center space-x-4 sm:flex-col">
          <Grid container spacing={2} className="w-full">
            <Grid item xs={12} sm={6}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listAllCategories || []}
                freeSolo
                style={{ width: "100%" }}
                onChange={(event, newValue) => {
                  setCategoryId(newValue?.id || "");
                }}
                getOptionLabel={(option) => option.name || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="หมวดหมู่สินค้า"
                    variant="outlined"
                    onChange={(e) => setSearchCate(e.target.value)}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                variant="outlined"
                placeholder="ค้นหาชื่อสินค้า"
                value={searchTerm}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
          </Grid>
        </div>
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-2xl font-semibold">
            {fgb ? fgb : "สินค้ายอดนิยม"}
          </h1>
        </div>
        {listAllProducts?.length === 0 ? (
          <div className="mt-4 p-2 rounded-md">
            <Alert severity="info">ไม่พบสินค้า</Alert>
          </div>
        ) : (
          <>
            {loading ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    padding: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
                    mt: 2,
                  }}
                >
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.5rem", marginBottom: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginBottom: 1 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{ borderRadius: 1 }}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem", marginTop: 1 }}
                  />
                </Box>
              </>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {listAllProducts?.map((item, index) => (
                    <>
                      <div key={index} className="card bg-white shadow-md p-4 w-50 h-50">
                        <div className="w-[800] h-[700] overflow-hidden relative">
                          <Image
                            src={item.images[0]?.url}
                            alt="Product 1"
                            className="w-[800] h-[700]  cursor-pointer object-center"
                            width={800}
                            height={700}
                            onClick={() => router.push("/products/" + item.id)}
                          />
                        </div>

                        <h2 className="text-gray-900 font-bold text-2xl mt-2">
                          {item.name}
                        </h2>

                        <div className="flex item-center mt-1">
                          <span className="text-gray-900 font-bold text-xl">
                            ฿{item.price}
                          </span>
                        </div>
                        <p className="mt-1">รายละเอียดสินค้า</p>
                        <div
                          className="overflow-hidden text-ellipsis whitespace-nowrap"
                          dangerouslySetInnerHTML={{
                            __html: truncate(item.desc, 10),
                          }}
                        ></div>
                        {/* <p className="mt-1 overflow-hidden text-ellipsis whitespace-nowrap">



                        </p> */}
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
          </>
        )}
        {!allpage && (
          <div className="flex mt-4 items-center justify-end">
            <Link href="/allproduct">
              <h1 className="text-1xl md:text-1xl lg:text-1xl font-semibold text-gray-800">
                ดูสินค้าทั้งหมด
              </h1>
            </Link>
          </div>
        )}
      </div>

      <div className="flex mt-9 items-center justify-center">
        <Pagination
          count={totalPages}
          color="primary"
          page={page}
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default PopProduct;
