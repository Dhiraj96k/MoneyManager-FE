import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../util/assets";
import { useNavigate } from "react-router-dom";

const SideBar = ({activeMenu}) => {

    const { user } = useContext(AppContext);
    const navigate=useNavigate();

    return (
        <div className="w-64 h-[calc(100vh-61px)] bg-white border-gray-200/50 p-5 sticky top-[61px] z-20">

            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">

                {user?.profileImage ? (
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-10 h-10 text-gray-600" />
                    </div>
                )}

                <h5 className="text-gray-950 font-medium leading-6">{user.full_name}</h5>
            </div>
            {SIDE_BAR_DATA.map((item,index)=>(
                <button 
                onClick={()=>navigate(item.path)}
                key={`menu_${index}`}
                className={`w-full  cursor-pointer flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 ${activeMenu==item.label ? "text-white bg-purple-800" :""}`}>
                    <item.icon className="text-xl"/>
                    {item.label}   
                </button>
            ))}

        </div>
    );
};

export default SideBar;
