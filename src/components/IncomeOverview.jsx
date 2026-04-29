import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart";
import { prepareIncomeLineChartData } from "../util/prepareIncomeLineChartData ";

const IncomeOverview = ({ transaction }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeLineChartData(transaction);
    setChartData(result);
  }, [transaction]);

  return (
    <div className="card p-4 my-2 bg-white rounded-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track Your earning over time and analyze your income trends
          </p>
        </div>
      </div>

      <div className="mt-10 w-full">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
