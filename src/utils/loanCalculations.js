export const calculateMonthlyPayment = (
  estimatedVehiclePrice,
  downPaymentPercentage,
  loanTerm,
  annualInterestRate = 0.18
) => {
  if (isNaN(estimatedVehiclePrice)) {
    return {
      monthlyPayment: "N/A",
      downPayment: "N/A",
      loanAmount: "N/A",
    };
  }

  const downPayment = (downPaymentPercentage / 100) * estimatedVehiclePrice;
  const loanAmount = estimatedVehiclePrice - downPayment;
  const monthlyInterestRate = annualInterestRate / 12;
  const totalPayments = loanTerm * 12;

  if (totalPayments === 0) {
    return {
      monthlyPayment: "N/A",
      downPayment: "N/A",
      loanAmount: "N/A",
    };
  }

  const numerator =
    loanAmount *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, totalPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;

  const monthlyPayment = numerator / denominator;

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    downPayment: downPayment.toFixed(2),
    loanAmount: loanAmount.toFixed(2),
  };
};