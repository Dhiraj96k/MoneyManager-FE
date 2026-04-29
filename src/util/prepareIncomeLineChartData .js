// Utility to prepare Line Chart Data for Income
export const prepareIncomeLineChartData = (transactions = []) => {
  if (!Array.isArray(transactions)) return [];

  const grouped = {};

  // 1️⃣ Group amounts by date
  transactions.forEach((t) => {
    const actualDate = new Date(t.date).toISOString().split("T")[0]; // YYYY-MM-DD

    if (!grouped[actualDate]) grouped[actualDate] = 0;

    grouped[actualDate] += Number(t.amount) || 0;
  });

  // 2️⃣ Convert into array + keep actualDate for sorting
  const chartData = Object.entries(grouped).map(([actualDate, amount]) => ({
    actualDate,                    // 🟦 used for sorting
    date: formatDate(actualDate),  // 🟩 formatted for UI
    amount                         // daily total
  }));

  // 3️⃣ Sort by actual date (correct order)
  chartData.sort((a, b) => new Date(a.actualDate) - new Date(b.actualDate));

  // 4️⃣ Add cumulative total (running sum)
  let runningTotal = 0;
  chartData.forEach(item => {
    runningTotal += item.amount;
    item.total = runningTotal;
  });

  return chartData;
};

// 📌 Format date → "12th Jan 2025"
const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // Jan
  const year = date.getFullYear();

  const suffix =
    day === 1 || day === 21 || day === 31 ? "st" :
    day === 2 || day === 22 ? "nd" :
    day === 3 || day === 23 ? "rd" : "th";

  return `${day}${suffix} ${month} ${year}`;
};
