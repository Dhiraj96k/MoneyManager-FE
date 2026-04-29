import { useEffect, useState } from "react";
import CustomLineChart from "./CustomLineChart";
import { prepareExpanseLineChartData } from "../util/prepareExpanseLineChartData";

const ExpanseOverview = ({ transaction }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    setChartData(prepareExpanseLineChartData(transaction));
  }, [transaction]);

  return (
    <div className="card p-4 my-2 bg-white rounded-2xl">
      <h5 className="text-lg">Expanse Overview</h5>
      <p className="text-xs text-gray-400">
        Track your expanse over time
      </p>

      <div className="mt-10">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpanseOverview;
