import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const DeleteAlert=({content,onDelete})=>{
    const[loading,setLoading]=useState(false)
    const handleDelete=async()=>{
        setLoading(true);
        try{
            await onDelete();
        }catch{
            setLoading(false);
        }
    }
    return(
        <div>
            <p className="text-sm">{content}</p>


            <div className="flex justify-end mt-6">
                <button
                onClick={handleDelete}
                disabled={loading}
                className="bg-green-200 text-green-800 card-btn flex items-center gap-1 transition-all duration-200 hover:bg-purple-600 hover:text-white hover:scale-[1.05] active:scale-95 rounded-lg"
                 type="button"
                 >
                   {loading?(
                    <>
                        <LoaderCircle className="h-4 w-4 animate-spin"/>
                        Deleting....
                    </>
                   ):(
                        <>
                            Delete
                        </>
                   )}

                </button>

            </div>
        </div>
    )
}

export default DeleteAlert;