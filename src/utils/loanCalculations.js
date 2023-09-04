// loancalculation.js

export const calculateMonthlyPayment = (
  estimatedVehiclePrice,
  downPayment,
  loanAmount, // New parameter
  annualInterestRate,
  loanTerm,
  percentage
) => {
  const calculatedLoanAmount = estimatedVehiclePrice - downPayment;

  const monthlyInterestRate = annualInterestRate / 12 / 100;

  const totalPayments = loanTerm * 12;

  const numerator =
    loanAmount *
    monthlyInterestRate *
    Math.pow(1 + monthlyInterestRate, totalPayments);
  const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;

  const monthlyPayment = numerator / denominator;

  const downPaymentPercentage = (downPayment / estimatedVehiclePrice) * 100;

  const loanToValueRatio = (loanAmount / estimatedVehiclePrice) * 100;

  const calculatedEstimatedVehiclePrice =
    calculatedLoanAmount / (1 - percentage / 100);

  return {
    monthlyPayment: monthlyPayment.toFixed(2),
    calculatedLoanAmount: calculatedLoanAmount.toFixed(2),
    downPaymentPercentage: downPaymentPercentage.toFixed(2),
    loanToValueRatio: loanToValueRatio.toFixed(2),
    calculatedEstimatedVehiclePrice: calculatedEstimatedVehiclePrice.toFixed(2), // Return the calculated estimated vehicle price
  };
};
