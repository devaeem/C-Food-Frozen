import axios from "axios";

export const getProduct = async (search, page, pageSize, categoryId) => {
  const url = process.env.NEXT_PUBLIC_API + "/product";
  const params = {};
  if (search) params.search = search || {};
  if (page) params.page = page || 1;
  if (pageSize) params.pageSize = pageSize || 10;
  if (categoryId) params.categoryId = categoryId || {};

  return await axios.get(url, { params });
};

export const createProduct = async ({ token, payload }) =>
  await axios.post(process.env.NEXT_PUBLIC_API + "/product", payload, {
    headers: {
      authtoken: token,
    },
  });

export const randomProduct = async () => {
  const url = process.env.NEXT_PUBLIC_API + "/productrandom";

  return await axios.get(url);
};

export const getProductId = async (id) => {
  return await axios.get(process.env.NEXT_PUBLIC_API + `/product/${id}`);
};

export const updateProductId = async ({ token, editId, payload }) => {
  return await axios.put(
    process.env.NEXT_PUBLIC_API + `/product/${editId}`,
    payload,
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

export const delProductId = async ({ token, id }) => {
  return await axios.delete(process.env.NEXT_PUBLIC_API + `/product/${id}`, {
    headers: {
      authtoken: token,
    },
  });
};
