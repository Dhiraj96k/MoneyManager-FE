import { useEffect, useState } from "react";
import Dashbord from "../components/Dashbord";
import { useUser } from "../hooks/userUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoint";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Model from "../components/Model";
import { Plus } from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
  useUser();

  const [incomeData, setIncomeData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddIncomeModel, setOpenAddIncomeModel] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // Fetch all incomes
  const fetch_income_details = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOME);

      if (response.status === 200) {
        console.log("Income List:", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch income details", error);
      toast.error(error.response?.data?.message || "Failed to fetch income details");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories for income only
  const fetchIncomeCategories = async () => {
    try {
      const response = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("income")
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("Failed to fetch income categories", error);
      toast.error(
        error.response?.data?.message || "Failed to fetch income categories"
      );
    }
  };

  const handleAddIncome = async (income) => {
  const { name, amount, date, icon, categoryId } = income;

  if (!name.trim()) {
    toast.error("Please enter a name");
    return;
  }

  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    toast.error("Amount should be a valid number greater than 0");
    return;
  }

  if (!date) {
    toast.error("Please select a date");
    return;
  }

  const today = new Date().toISOString().split("T")[0];
  if (date > today) {
    toast.error("Date cannot be in the future");
    return;
  }

 

  try {
    const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
      name,
      amount: Number(amount),
      date,
      icon,
      categoryId,
    });

    if (response.status === 201 || response.status===200) {
      setOpenAddIncomeModel(false); // 🔥 WILL WORK NOW
      toast.success("Income added successfully");
      fetch_income_details();
      fetchIncomeCategories();
    }

  } catch (error) {
    console.log("Error adding income", error);
    toast.error(error.response?.data?.message || "Failed to add income");
  }
};


//Delete Income Details
const deleteIncome=async(id)=>{
    try{
        await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
        setOpenDeleteAlert({show:false,date:null})
        toast.success("Income Deleted Successfully...");
        fetch_income_details();
    }catch(error){
        console.log("Error in deleting income",error);
        toast.error(error.response?.data?.message || "Failed to delete an income");
    }
}

  const handleDownlodIncomeDetails=async()=>{
    try{
        const response=await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOD,{responseType:"blob"});
        let filename="income_details.xlsx";
        const url=window.URL.createObjectURL(new Blob([response.data]));
        const link=document.createElement("a");
        link.href=url;
        link.setAttribute("download",filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success("Downlod Income Details Successfull")
    }catch(error ){
      console.error('Error downloding income details:',error);
      toast.error(error.response?.data?.message || "Failed to Downlod income");
    }
  }

 const handleEmailIncomeDetails = async () => {
  try {
    // Call the backend endpoint (POST request)
    const response = await axiosConfig.post(API_ENDPOINTS.EMAIL_INCOME);

    if(response.status===200){
    //console.log(response.data); // "Income Excel sent successfully to your email!"
    toast.success("Income details emailed successfully");
  }


  } catch (error) {
    console.error("Failed to send income Excel", error);
    toast.error(
      error.response?.data || "Failed to send income Excel"
    );
  }
};







  useEffect(() => {
    fetch_income_details();
    fetchIncomeCategories();
  }, []);

  return (
    <Dashbord activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">

          {/* Add Income Button */}
          <div>
            <button
              className="bg-green-200 w-35 p-1.5 text-green-800 card-btn flex items-center gap-1 transition-all duration-200 hover:bg-purple-600 hover:text-white hover:scale-[1.05] active:scale-95 rounded-lg"
              onClick={() => setOpenAddIncomeModel(true)}
            >
              <Plus size={15} className="text-lg" />
              Add Income
            </button>

            <IncomeOverview transaction={incomeData}/>
          </div>

          {/* Income List */}
          <IncomeList
            transaction={incomeData}
            onDelete={(id) => setOpenDeleteAlert({show:true,data:id})}
            onDownload={handleDownlodIncomeDetails}
            onEmail={handleEmailIncomeDetails}
          />

          {/* Add Income Modal */}
          <Model
            isOpen={openAddIncomeModel}
            onClose={() => setOpenAddIncomeModel(false)}
            title="Add Income"
          >
            <AddIncomeForm
              onAddIncome={(income) => handleAddIncome(income)}
              categories={categories}
            />
          </Model>

        
        <Model
            isOpen={openDeleteAlert.show}
            onClose={()=>setOpenDeleteAlert({show:false,date:null})}
            title="Delete Income">
                <DeleteAlert
                 content="Are you sure want to delete this income detils?"
                 onDelete={()=>deleteIncome(openDeleteAlert.data)}
                />
            </Model>
        </div>
      </div>
    </Dashbord>
  );
};

export default Income;
