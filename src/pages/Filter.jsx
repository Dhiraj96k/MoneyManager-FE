import { Search } from "lucide-react";
import Dashbord from "../components/Dashbord";
import { useUser } from "../hooks/userUser";
import { useState } from "react";
import axios from "axios";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoint";
import toast from "react-hot-toast";


const Filter = () => {
  useUser();

  const[type,setType]=useState("income");
  const[startDate,setStartDate]=useState("");
  const[endDate,setEndDate]=useState("");
  const[keyword,setKeyword]=useState("");
  const[sortField,setSortFiled]=useState("date");
  const[sortOrder,setSortOrder]=useState("asc");
  const[transection,setTransection]=useState([]);
  const[loading,setLoading]=useState(false);

  const handleSearch=async(e)=>{
    e.preventDefault();
    console.log(type,startDate,endDate,sortField,sortOrder,keyword);
    setLoading(true);
    try{
      const response=await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS,{
        type,
        startDate,
        endDate,
        keyword,
        sortField,
        sortOrder
      });
      setTransection(response.data);
      //console.log(response.data);
    }catch(error){
      console.error("Failed to fetch transection:".error);
      toast.error(error.message || "Failed to fetch transection.please try Again Later");
    } 
    finally{
      setLoading(false);
    }
    

  }



  return (
    <Dashbord activeMenu="Filters">
      <div className="my-5 mx-auto">
        <div className="flex justify-between items-center-safe mb-4">
          <h2 className="text-2xl font-semibold">Filter Transection</h2>
        </div>
        <div className="card p-4 my-2 bg-white rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">Select the Filter</h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="type">Type</label>
                <select id="type"  className="w-full border rounded px-3 py-2" value={type} onChange={e=>setType(e.target.value)}>
                  <option value="income">Income</option>
                  <option value="expense">Expanse</option>
                </select>
              </div>
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">Start Date</label>
                <input className="w-full border rounded px-3 py-2" type="date" id="startDate" value={startDate} onChange={e=>setStartDate(e.target.value)} />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium mb-1">End Date</label>
                <input value={endDate} onChange={e=>setEndDate(e.target.value)} className="w-full border rounded px-3 py-2" type="date" id="endDate" />
              </div>
              <div>
                  <label htmlFor="sortFiled" className="block text-sm font-medium mb-1">Sort field</label>
                <select value={sortField} onChange={e=>setSortFiled(e.target.value)} id="sortfield"  className="w-full border rounded px-3 py-2">
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="category">Category</option>
                </select>
              </div>
              <div>
                <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">Sort Order</label>
                <select value={sortOrder} onChange={e=>setSortOrder(e.target.value)} id="sortOrder"  className="w-full border rounded px-3 py-2">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              <div className="sm:col-span-1 md:col-span-1 flex items-end">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1"> Search</label>
                    <input value={keyword} onChange={e=>setKeyword(e.target.value)} id="keyword" type="text" placeholder="Serach..." className="w-full border rounded px-3 py-2"></input>
                  </div>
                  <button 
                  onClick={handleSearch}
                  className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer">
                        <Search size={20}/>
                  </button>
              </div>
          </form>
        </div>
        <div className="card p-4 mt-4 bg-white rounded-2xl">

  {/* Loading */}
  {loading && (
    <p className="text-center text-gray-500">Loading transactions...</p>
  )}

  {/* Empty */}
  {!loading && transection.length === 0 && (
    <p className="text-center text-gray-500">No transactions found</p>
  )}

  {/* Table */}
  {!loading && transection.length > 0 && (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold">Sr no</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Icon</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Category</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Amount</th>
            <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
          </tr>
        </thead>
        <tbody>
          {transection.map((item, index) => (
            <tr key={item.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{index + 1}</td>

              {/* Icon */}
              <td className="px-4 py-2 text-xl">
                {item.icon ? item.icon : "💰"}
              </td>

              {/* Name */}
              <td className="px-4 py-2">{item.name}</td>

              {/* Category */}
              <td className="px-4 py-2">
                {item.categoryName || "N/A"}
              </td>

              {/* Amount */}
              <td className="px-4 py-2 font-semibold text-green-600">
                ₹{item.amount}
              </td>

              {/* Date */}
              <td className="px-4 py-2">
                {item.date
                  ? new Date(item.date).toLocaleDateString("en-IN")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      </div>
    </Dashbord>
  );
};

export default Filter;
