import { useState } from "react";
import EmojiPickerPopUp from "../components/EmojiPickerPopUp";
import Input from "../components/Input";

const AddExpanseForm = ({ onAddExpanse, categories }) => {

  const [expanse, setExpanse] = useState({
    name: "",
    amount: "",
    date: "",
    icon: "",
    categoryId: ""
  });

  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name
  }));

  const handleChange = (key, value) => {
    setExpanse({ ...expanse, [key]: value });
  };

  return (
    <div className="p-4">

      {/* Emoji Picker */}
      <EmojiPickerPopUp
        icon={expanse.icon}
        onSelect={(emoji) => handleChange("icon", emoji)}
      />

      {/* Name */}
      <Input
        label="Expanse Source"
        type="text"
        value={expanse.name}
        placeHolder="e.g Rent, Grocery"
        onChange={({ target }) => handleChange("name", target.value)}
      />

      {/* Category */}
      <Input
        label="Category"
        isSelect={true}
        value={expanse.categoryId}
        option={categoryOptions}
        onChange={({ target }) => handleChange("categoryId", target.value)}
      />

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        value={expanse.amount}
        placeHolder="e.g 500.00"
        onChange={({ target }) => handleChange("amount", target.value)}
      />

      {/* Date */}
      <Input
        label="Date"
        type="date"
        value={expanse.date}
        onChange={({ target }) => handleChange("date", target.value)}
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={() => onAddExpanse(expanse)}
          className="bg-red-900 text-white w-30 rounded-xl px-2 card-btn flex items-center gap-1 transition-all duration-200 hover:bg-purple-600 hover:text-white hover:scale-[1.05] active:scale-95"
        >
          ADD EXPANSE
        </button>
      </div>

    </div>
  );
};

export default AddExpanseForm;
