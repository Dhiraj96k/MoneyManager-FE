import { Download, LoaderCircle, Mail } from "lucide-react";
import TransectionInformationCard from "./TransectionInformationCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transaction, onDelete, onDownload, onEmail }) => {
  const [loading, setLoading] = useState(false);

  const handleEmail = async () => {
    setLoading(true);
    try {
      await onEmail();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await onDownload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 bg-white rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h5 className="text-lg font-semibold">Income Source</h5>

        <div className="flex items-center gap-2">
          {/* Email Button */}
          <button
            disabled={loading}
            onClick={handleEmail}
            className="card-btn flex items-center gap-1 rounded-lg transition-all duration-200 hover:bg-purple-600 hover:text-white"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Emailing...
              </>
            ) : (
              <>
                <Mail size={16} />
                Email
              </>
            )}
          </button>

          {/* Download Button */}
          <button
            disabled={loading}
            onClick={handleDownload}
            className="card-btn flex items-center gap-1 rounded-lg transition-all duration-200 hover:bg-purple-600 hover:text-white"
          >
            {loading ? (
              <>
                <LoaderCircle className="w-4 h-4 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download size={16} />
                Download
              </>
            )}
          </button>
        </div>
      </div>

      {/* Income Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transaction?.map((income) => (
          <TransectionInformationCard
            key={income.id}
            title={income.name}
            icon={income.icon}
            date={moment(income.date).format("Do MMMM YYYY")}
            amount={income.amount}
            type="income"
            onDeleteFunction={() => onDelete(income.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
