export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  // Convert number to string
  const numStr = num.toString();
  const parts = numStr.split('.'); // Split into integer and fractional parts

  let integerPart = parts[0];
  let fractionalPart = parts[1];

  // Regex for Indian numbering system
  // Handles first 3 digits, then 2 digits in groups
  const lastThree = integerPart.substring(integerPart.length - 3);
  const otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== '') {
    const formattedOtherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    integerPart = formattedOtherNumbers + ',' + lastThree;
  } else {
    integerPart = lastThree; // if below 1000, no grouping needed
  }

  // Combine integer and fractional parts
  return fractionalPart ? `${integerPart}.${fractionalPart}` : integerPart;
};
