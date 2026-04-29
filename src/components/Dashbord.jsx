import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuBar from "./MenuBar.jsx";
import SideBar from "./SideBar.jsx";

const Dashbord = ({ children,activeMenu }) => {

    const{user}=useContext(AppContext);
    return (
        <div>
            <MenuBar activeMenu={activeMenu}/>
                {user &&(
                    <div className="flex">
                    <div className="max-[1080px]:hidden">
                        <SideBar activeMenu={activeMenu} />
                    </div>

                    <div className="grow mx-5">
                        {children}
                    </div>
                </div>
                )
                
                }
            
        </div>
    );
};

export default Dashbord;
