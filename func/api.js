import axios from "axios";

export const getCategories = async () =>
  await axios.get("https://cfoodfrozen.vercel.app/api/category");


export const createCategories = async (payload) =>
 await axios.post("https://cfoodfrozen.vercel.app/api/category",payload);
 // await axios.post("http://localhost:3000/api/category",payload);