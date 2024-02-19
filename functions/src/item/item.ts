import { configDotenv } from "dotenv";
import axios from "axios";
configDotenv();

export const fetchData = async (
  endpoint: string,
  params: { [key: string]: string | number }
) => {
  const res = await axios.get(endpoint, { params: params, timeout: 3000 });
  return res.data;
};
