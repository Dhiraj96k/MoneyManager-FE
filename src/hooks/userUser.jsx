import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import axiosConfig from "../util/axiosConfig.jsx";   // make sure your path is correct
import { API_ENDPOINTS } from "../util/apiEndPoint.js";             // example path

export const useUser = () => {
  const { user, setUser, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return; // user already exists

    let isMounted = true;

    const fetchUserinfo = async () => {
      try {
        const response = await axiosConfig.get(API_ENDPOINTS.GET_USER_INFO);

        if (isMounted && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("User fetch failed:", error);
        if(isMounted){
        clearUser();
        navigate("/login");
        }
      }
    };

    fetchUserinfo();

    return () => {
      isMounted = false;
    };
  }, [setUser, clearUser,navigate]);

  return { user, setUser, clearUser };
};
