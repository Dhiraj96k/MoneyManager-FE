import { useState } from "react";
import EmojiPickerPopUp from "../components/EmojiPickerPopUp";   // <-- FIXED IMPORT
import Input from "../components/Input";                          // <-- You MUST import Input
// Make sure path is correct


const AddIncomeForm = ({ onAddIncome, categories }) => {

  const [income, setIncome] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: ""                     // <-- FIXED spelling
  });

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const handleChange = (key, value) => {
    setIncome({ ...income, [key]: value });
  };

  return (
    <div className="p-4">

      {/* Emoji Picker */}
      <EmojiPickerPopUp
        icon={income.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
      />

      {/* Name */}
      <Input
        label="Income Source"
        type="text"
        value={income.name}
        placeHolder="e.g Salary, Bonus"
        onChange={({ target }) => handleChange("name", target.value)}
      />

      {/* Category */}
      <Input
        label="Category"
        isSelect={true}
        value={income.categoryId}
        option={categoryOptions}
        onChange={({ target }) => handleChange("categoryId", target.value)}
      />

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        value={income.amount}
        placeHolder="e.g 500.00"
        onChange={({ target }) => handleChange("amount", target.value)}
      />

      {/* Date */}
      <Input
        label="Date"
        type="date"
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />

      <div className="flex justify-end mt-6">
            <button
                type="button"
                onClick={() => onAddIncome(income)}
                className="bg-blue-900 text-white w-30 rounded-xl px-2 card-btn flex items-center gap-1 transition-all duration-200 hover:bg-purple-600 hover:text-white hover:scale-[1.05] active:scale-95"
            >
                ADD INCOME
            </button>
        </div>


    </div>


  );
};

export default AddIncomeForm;
