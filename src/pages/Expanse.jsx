import { useEffect, useState } from "react";
import Dashbord from "../components/Dashbord";
import { useUser } from "../hooks/userUser";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoint";
import toast from "react-hot-toast";
import ExpanseList from "../components/ExpanseList";
import Model from "../components/Model";
import { Plus } from "lucide-react";
import AddExpanseForm from "../components/AddExpanseForm";
import DeleteAlert from "../components/DeleteAlert";
import ExpanseOverview from "../components/ExpanseOverview";

const Expanse = () => {
  useUser();

  const [expanseData, setExpanseData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAddExpanseModel, setOpenAddExpanseModel] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // 🔹 Fetch current month expanse
  const fetchExpanse = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPANSE);
      setExpanseData(res.data);
    } catch (err) {
      toast.error("Failed to fetch expanse");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch expanse categories
  const fetchExpanseCategories = async () => {
    try {
      const res = await axiosConfig.get(
        API_ENDPOINTS.CATEGORY_BY_TYPE("expanse")
      );
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch expanse categories");
    }
  };

  // 🔹 Add expanse
  const handleAddExpanse = async (expanse) => {
    try {
      await axiosConfig.post(API_ENDPOINTS.ADD_EXPANSE, expanse);
      toast.success("Expanse added");
      setOpenAddExpanseModel(false);
      fetchExpanse();
    } catch (err) {
      toast.error("Failed to add expanse");
    }
  };

  // 🔹 Delete expanse
  const deleteExpanse = async (id) => {
    try {
      await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPANSE(id));
      toast.success("Expanse deleted");
      setOpenDeleteAlert({ show: false, data: null });
      fetchExpanse();
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔹 Download excel
  const handleDownloadExpanse = async () => {
    const res = await axiosConfig.get(
      API_ENDPOINTS.EXPANSE_EXCEL_DOWNLOAD,
      { responseType: "blob" }
    );
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = "expanse.xlsx";
    a.click();
  };

  // 🔹 Email excel
  const handleEmailExpanse = async () => {
    await axiosConfig.post(API_ENDPOINTS.EMAIL_EXPANSE);
    toast.success("Expanse emailed");
  };

  useEffect(() => {
    fetchExpanse();
    fetchExpanseCategories();
  }, []);

  return (
    <Dashbord activeMenu="Expanse">
      <div className="my-5 mx-auto grid gap-6">

        {/* Add Expanse Button */}
        <button
          className="bg-red-200 w-35 p-1.5 rounded-2xl text-red-800 card-btn flex items-center gap-1"
          onClick={() => setOpenAddExpanseModel(true)}
        >
          <Plus size={15} /> Add Expanse
        </button>

        <ExpanseOverview transaction={expanseData} />

        <ExpanseList
          transaction={expanseData}
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadExpanse}
          onEmail={handleEmailExpanse}
        />

        {/* Add Modal */}
        <Model
          isOpen={openAddExpanseModel}
          onClose={() => setOpenAddExpanseModel(false)}
          title="Add Expanse"
        >
          <AddExpanseForm
            onAddExpanse={handleAddExpanse}
            categories={categories}
          />
        </Model>

        {/* Delete Modal */}
        <Model
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expanse"
        >
          <DeleteAlert
            content="Are you sure want to delete this expanse?"
            onDelete={() => deleteExpanse(openDeleteAlert.data)}
          />
        </Model>
      </div>
    </Dashbord>
  );
};

export default Expanse;
