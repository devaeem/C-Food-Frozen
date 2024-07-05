import axios from "axios";

export const getBanner = async (search, page, pageSize) => {
  const url = process.env.NEXT_PUBLIC_API + "/banner";
  const params = {};
  if (search) params.search = search || {};
  if (page) params.page = page || 1;
  if (pageSize) params.pageSize = pageSize || 10;

  return await axios.get(url, { params });
};

export const createBanner = async ({token,payload}) =>
  await axios.post(process.env.NEXT_PUBLIC_API + "/banner", payload, {
    headers: {
      authtoken: token,
    },
  });

export const getBannerId = async (id) => {
  return await axios.get(process.env.NEXT_PUBLIC_API + `/banner/${id}`);
};

export const updateBannerId = async ({token,editId, payload}) => {

  return await axios.put(
    process.env.NEXT_PUBLIC_API + `/banner/${editId}`,
    payload,
    {
      headers: {
        authtoken: token,
      },
    }
  );
};

export const delBannerId = async ({token,id}) => {
  return await axios.delete(process.env.NEXT_PUBLIC_API + `/banner/${id}`, {
    headers: {
      authtoken: token,
    },
  });
};
