import axios from "axios";

export const getCategories = async (search, page, pageSize) => {
  const url = process.env.NEXT_PUBLIC_API + "/category";
  const params = {};
  if (search) params.search = search || {};
  if (page) params.page = page || 1;
  if (pageSize) params.pageSize = pageSize || 10;

  return await axios.get(url, { params });
};

export const createCategories = async (payload) =>
  await axios.post(process.env.NEXT_PUBLIC_API + "/category", payload);
// await axios.post("http://localhost:3000/api/category",payload);


export const getCategoriesId = async (id) => {
  return await axios.get(process.env.NEXT_PUBLIC_API + `/category/${id}`);
}

export const updateCategoriesId = async (editId,data) => {
  return await axios.put(process.env.NEXT_PUBLIC_API + `/category/${editId}`,data);
}

export const delCategoriesId = async (id) => {
  return await axios.delete(process.env.NEXT_PUBLIC_API + `/category/${id}`);
}