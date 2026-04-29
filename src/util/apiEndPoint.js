// export const BASE_URL = "https://money-manager-api-production-f915.up.railway.app/api/v1.0";
export const BASE_URL = "http://localhost:8080/api/v1.0";

const CLOUDINARY_CLOUD_NAME = "dplliikrs";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO:"/profile",
  GET_ALL_CATEGORIES:"/categories",
  ADD_CATEGORY:"/categories",
  UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,

  GET_ALL_INCOME:"/income",
  CATEGORY_BY_TYPE:(type)=>`/categories/${type}`,
  ADD_INCOME:"/income",
  DELETE_INCOME:(incomeId)=>`/income/${incomeId}`,
  INCOME_EXCEL_DOWNLOD:"income/export/excel",
  EMAIL_INCOME:"/email/income-excel",

  GET_ALL_EXPANSE: "/expenses",
  ADD_EXPANSE: "/expenses",
  DELETE_EXPANSE: (id) => `/expenses/${id}`,

  APPLY_FILTERS:"/filter",


  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
};
