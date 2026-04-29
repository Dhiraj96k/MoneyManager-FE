import { Plus } from "lucide-react";
import Dashbord from "../components/Dashbord";
import { useUser } from "../hooks/userUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoint";
import toast from "react-hot-toast";
import Model from "../components/Model";
import AddCategoryForm from "../components/AddCategoryForm";


const Category=()=>{
    useUser();
    const[loading,setLoading]=useState(false);
    const[categoryData,setCategoryData]=useState([]);
    const[openAddCategoryModel,setOpenAddCategoryModel]=useState(false);
    const[openEditCategoryMOdel,setOPenEditCategoryModel]=useState(false);
    const[selectedCategory,setSelectedCategory]=useState(null);

    const fetchCategoryDetail= async()=>{
        if(loading) return;
        setLoading(true);

        try{
            const response= await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status===200){
                console.log('categories',response.data);
                setCategoryData(response.data);
            }

        }catch(error){
            console.error("Something went wrong.Please try Again",error);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchCategoryDetail();
    },[])

    const handleAddCategory = async (category) => {
  const { name, type, icon } = category;

  if (!name.trim()) {
    toast.error("Category name is required");
    return;
  }

  //Check if Category Alreday Exists
  const isDuplicate =categoryData.some((category)=>{
    return category.name.toLowerCase()===name.trim().toLowerCase();
  })

  if(isDuplicate){
    toast.error("Category Name Already Exists..");
    return;
  }

  try {
    const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {
      name,
      type,
      icon
    });

    if (response.status === 201) {
      toast.success("Category Added Successfully");
      setOpenAddCategoryModel(false);
      fetchCategoryDetail();
    }
  } catch (error) {
    console.error("Error Adding Category", error);
    toast.error(error.response?.data?.message || "Failed to add category");
  }
};



    const handleEditCategory=(categoryToEdit)=>{
        //console.log("Edint",categoryToEdit)
        setSelectedCategory(categoryToEdit);
        setOPenEditCategoryModel(true);
    }

    const handleUpdateCategory=async(updateCategory)=>{
       const {id,name,type,icon}=updateCategory;

       if(!name.trim()){
        toast.error("Category Name is Required for update");
        return;
       }
       if(!id){
        toast.error("Category ID is Missing for updation");
        return;
       }
       try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
            setOPenEditCategoryModel(false);
            setSelectedCategory(null);
            toast.success("Category Added Successfully..");
            fetchCategoryDetail();
       }catch(error){
        console.error('Error Updating Category',error,response?.data?.message || error.message);
        toast.error(error.response?.data?.message || "failed to update Category")
       }
    }



    return(
        <Dashbord activeMenu="Category">
               <div className="my-5 mx-auto">
                    {/* Add Button to add Category */}

                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-2xl font-semibold"> All Categories</h2>
                        <button 
                        onClick={()=>setOpenAddCategoryModel(true)}
                        className="add-btn flex items-center gap-1 text-blue-600 hover:cursor-pointer">
                            <Plus size={15}/>
                            Add Category
                        </button>

                    </div>




                    {/* Category List */}

                    <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>


                    {/* Adding Category Model */}
                    <Model
                        isOpen={openAddCategoryModel}
                        onClose={() => setOpenAddCategoryModel(false)}
                        title="Add Category"
                    >
                        <AddCategoryForm onAddCategory={handleAddCategory} />
                    </Model>



                    {/* Updating category model*/}

                   <Model
                    isOpen={openEditCategoryMOdel}
                    onClose={()=>{
                        setOPenEditCategoryModel(false);
                        setSelectedCategory(null);
                    }}
                    title={"Update Category"}
                   >
                        <AddCategoryForm
                            initialCategoryData={selectedCategory}
                            onAddCategory={handleUpdateCategory}
                            isEditing={true}
                        />
                    </Model> 

                </div>
            </Dashbord>
    )
}

export default Category;