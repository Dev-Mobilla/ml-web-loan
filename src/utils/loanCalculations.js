export const calculateMonthlyPayment = (
  estimatedVehiclePrice,
  downPaymentPercentage,
  annualInterestRate,
  loanTerm
) => {
  const downPayment = (downPaymentPercentage / 100) * estimatedVehiclePrice;
  const loanAmount = estimatedVehiclePrice - downPayment;
  const monthlyInterestRate = annualInterestRate / 12 / 100;
  const totalPayments = loanTerm * 12;

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