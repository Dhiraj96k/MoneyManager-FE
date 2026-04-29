// Utility to prepare Line Chart Data for Expanse
export const prepareExpanseLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions)) return [];

  const grouped = {};

  transactions.forEach((t) => {
    const actualDate = new Date(t.date).toISOString().split("T")[0];

    if (!grouped[actualDate]) grouped[actualDate] = 0;
    grouped[actualDate] += Number(t.amount) || 0;
  });

  const chartData = Object.entries(grouped).map(([actualDate, amount]) => ({
    actualDate,
    date: formatDate(actualDate),
    amount
  }));

  chartData.sort((a, b) => new Date(a.actualDate) - new Date(b.actualDate));

  let runningTotal = 0;
  chartData.forEach(item => {
    runningTotal += item.amount;
    item.total = runningTotal;
  });

  return chartData;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31 ? "st" :
    day === 2 || day === 22 ? "nd" :
    day === 3 || day === 23 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
};
