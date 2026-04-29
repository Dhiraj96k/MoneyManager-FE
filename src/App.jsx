import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Income from "./pages/Income.jsx";
import Expanse from "./pages/Expanse.jsx";
import Category from "./pages/Category.jsx";
import Filter from "./pages/Filter.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expanse" element={<Expanse />} />
        <Route path="/category" element={<Category />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default App;
