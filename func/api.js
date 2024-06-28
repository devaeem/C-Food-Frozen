import axios from "axios";

export const getCategories = async () =>
  await axios.get("http://localhost:3000/api/category");


export const createCategories = async (payload) =>
 await axios.post("http://localhost:3000/api/category",payload);