import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/asset.js";
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/apiEndPoint.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelectorComponent from "../components/ProfilePhotoSelectorComponent.jsx";
import { upload_profile_image } from "../util/uplodProfileImage.js";

const SignUp = () => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passward, setPassward] = useState("");
  const [error, setError] = useState(null);
  const[isLoading,setIsLoading]=useState(false);
  const[profilePhoto,setProfilePhoto]=useState(null);

  const navigate = useNavigate();

  const handleSubmit=async(e)=>{
     e.preventDefault();

    let profile_image="";

     setIsLoading(true);



     //Basic Validation

     if(!fullName.trim()){setError("Please Enter Your Full Name"); setIsLoading(false) ;return;}
    if(!validateEmail(email)){setError("Please Enter Valid Email Address");setIsLoading(false) ; return;}
    if(!passward.trim()){setError("Please Enter Your Passward");setIsLoading(false) ; return;}
    setError("");
    
    try{

      //uplod Image if present
      if(profilePhoto){
        const imageUrl=await upload_profile_image(profilePhoto);
        profile_image=imageUrl ||"";
      }
      const response=await axiosConfig.post(API_ENDPOINTS.REGISTER,{
        fullName,
        email,
        passward,
        profileImage: profile_image 
      })
      if(response.status===201){
        toast.success("Profile Created Successfully");
        navigate("/login");
      }
    }catch(err){
      console.error("Somthing Went Wrong",err);
      setError(err.message);
    }finally{
      setIsLoading(false) ;
    }


  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">

      {/* Background Image */}
      <img
        src={assets.bg_image}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
        <h3 className="text-2xl font-semibold text-black text-center mb-2">Create An Account</h3>
        <p className="text-sm text-slate-700 text-center mb-8">Start Tracking your spending by Joining with us</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center mb-6">
              <ProfilePhotoSelectorComponent Image={profilePhoto} setImage={setProfilePhoto}/>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <Input 
                value={fullName}
                onChange={(e)=>setFullName(e.target.value)}
                label="Full Name"
                placeHolder="Tejas Jadhav"
                type="text"            
            />

            <Input 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                label="Email Adresss"
                placeHolder="tejasjadhav@exapmle.com"
                type="text"            
            />

            <div className="col-span-2">
              <Input 
                value={passward}
                onChange={(e)=>setPassward(e.target.value)}
                label="Password"
                placeHolder="**********"
                type="password"            
             />
            </div >
            <div className="col-span-2">
              {error &&(
               <p className="text-red-800 text-sm text-center  **rounded**">{error}</p>
                )}
              </div>
            </div>

           <button disabled={isLoading} className={`btn-primary w-full py-3 text-lg font-medium bg-blue-800 text-white flex items-center justify-center gap-2 ${isLoading?`opacity-60 cursor-not-allowed`:``}`} type="submit">
                {isLoading ?(
                  <>
                    <LoaderCircle className="animate-spin w-5 h-5"/>
                    Singning Up.....
                  </>
                ):(
                  "SIGN UP"
                )}
             </button>


            <p className="text-sm text-slate-800 text-center mt-6">Already Have an Account?
              <Link to="/login" className="font-medium   text-primary underline hover:text-prmary-dark transition-colors">Login</Link>
            </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
