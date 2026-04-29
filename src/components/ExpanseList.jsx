import { Download, LoaderCircle, Mail } from "lucide-react";
import TransectionInformationCard from "./TransectionInformationCard";
import moment from "moment";
import { useState } from "react";

const ExpanseList = ({ transaction, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="card p-4 bg-white rounded-2xl">
      <div className="flex justify-between mb-3">
        <h5 className="text-lg font-semibold">Expanse List</h5>

        <div className="flex gap-2">
          <button onClick={onEmail} className="card-btn flex gap-1">
            <Mail size={16} /> Email
          </button>

          <button onClick={onDownload} className="card-btn flex gap-1">
            <Download size={16} /> Download
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transaction?.map((e) => (
          <TransectionInformationCard
            key={e.id}
            title={e.name}
            icon={e.icon}
            date={moment(e.date).format("Do MMM YYYY")}
            amount={e.amount}
            type="expanse"
            onDeleteFunction={() => onDelete(e.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpanseList;
