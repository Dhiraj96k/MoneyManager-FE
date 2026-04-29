import { useEffect, useState } from "react";
import Input from "./Input";
import EmojiPickerPopUp from "./EmojiPickerPopUp";
import { LoaderCircle } from "lucide-react";

const AddCategoryForm = ({onAddCategory,initialCategoryData,isEditing}) => {
  const [category, setCategory] = useState({
    name: "",
    type: "income",
    icon: "",
  });
   const[loading,setLoading]=useState(false);

   useEffect(()=>{
    if(isEditing && initialCategoryData){
        setCategory(initialCategoryData);
    }else{
        setCategory({name:"", type:"income",icon:""})
    }
   },[isEditing,initialCategoryData])

  const categoryTypeOptions = [
    { value: "income", label: "income" },
    { value: "expanse", label: "expanse" },
  ];

  const handleChange = (key, value) => {
    setCategory({ ...category, [key]: value });
  };

  const handleSubmit=async()=>{
    setLoading(true);
    try{
        await  onAddCategory(category);
    }finally{
        setLoading(false);
    }
   
  }

  return (
    <div className="p-4" >

        <EmojiPickerPopUp
            icon={category.icon}
            onSelect={(selectedIcon)=>handleChange("icon",selectedIcon)}
        />

      <Input
        value={category.name}
        onChange={({ target }) => handleChange("name", target.value)}
        label="Category Name"
        placeHolder="e.g Freelance, Salary, Bonus"
        type="text"
      />

      <Input
        label="Category Type"
        value={category.type}
        onChange={({ target }) => handleChange("type", target.value)}
        isSelect={true}
        option={categoryTypeOptions}
      />  {/* ✅ Closing tag added */}

        <div className=" flex justify-end mt-6">
        <button 
            type="button"
            onClick={handleSubmit}
            disabled={loading}
             className="px-5 py-2 rounded-lg text-white font-medium 
             bg-linear-to-r from-purple-600 to-purple-800 
             shadow-md hover:shadow-lg transition-all duration-200"
            >
            {loading?(
                <>
                    <LoaderCircle className="w-4 h-4 animate-spin"/>
                    {isEditing?"Updating..":"Adding..."}
                </> 
            ):(
                <>
                    {isEditing ?"Update Category":"Add Category"}
                </>

            )}
            </button>

        </div>
    </div>
  );
};

export default AddCategoryForm;
