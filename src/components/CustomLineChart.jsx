import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div className="bg-white p-3 rounded-xl shadow border border-gray-200">
        <p className="font-semibold text-gray-800">{item.date}</p>

        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Amount:</span> ₹{item.amount}
        </p>

        <p className="text-sm text-gray-600">
          <span className="font-semibold">Total:</span> ₹{item.total}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#6a5af9" stopOpacity={0.8} />
              <stop offset="90%" stopColor="#6a5af9" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="date" />
          <YAxis />

          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* ⭐ Custom Tooltip */}
          <Tooltip content={<CustomTooltip />} />

          {/* Area background fill */}
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#6a5af9"
            fill="url(#colorPurple)"
            strokeWidth={3}
          />

          {/* Main Line */}
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#6a5af9"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
