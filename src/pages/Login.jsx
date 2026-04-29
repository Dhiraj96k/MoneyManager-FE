import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/asset.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axios from "axios";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoint.js";
import { AppContext } from "../context/AppContext.jsx";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [passward, setPassward] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (!validateEmail(email)) {
            setError("Please Enter a Valid Email Address");
            setIsLoading(false);
            return;
        }
        if (!passward.trim()) {
            setError("Please Enter Your Passward");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {
                email,
                passward,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                toast.success("Login Successful!");
                navigate("/dashboard");
            } else {
                setError("Login failed. Please check credentials.");
            }
        } catch (error) {
            console.error('Login failed:', error.response?.data || error.message);
            setError(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">

            <img
                src={assets.bg_image}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover filter blur-sm"
            />

            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">

                <h3 className="text-2xl font-semibold text-black text-center mb-2">Welcome Back</h3>
                <p className="text-sm text-slate-700 text-center mb-8">Please Enter Your Details To Login</p>

                <form className="space-y-4" onSubmit={handleSubmit}>


                    <div className="space-y-4">
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email Address"
                            placeHolder="YourEmail@example.com"
                            type="email"
                        />

                        <Input
                            value={passward}
                            onChange={(e) => setPassward(e.target.value)}
                            label="Password"
                            placeHolder="**********"
                            type="password"
                        />

                        {error && (
                            <p className="text-red-800 text-sm text-center bg-red-50 rounded p-2">{error}</p>
                        )}
                    </div>

                    <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium bg-blue-800 text-white flex items-center justify-center gap-2 ${isLoading ? `opacity-60 cursor-not-allowed` : ``}`} type="submit">
                        {isLoading ? (
                            <>
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                Logging in.....
                            </>
                        ) : (
                            "LOGIN IN"
                        )}
                    </button>

                    <p className="text-sm text-slate-800 text-center mt-6">Don't have an account?
                        <Link to="/signUp" className="font-medium text-blue-800 underline hover:text-blue-600 transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;