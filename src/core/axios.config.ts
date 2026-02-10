import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce.routemisr.com",
});

export default axiosInstance;