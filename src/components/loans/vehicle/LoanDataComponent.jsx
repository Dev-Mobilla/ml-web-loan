import { useState, useEffect } from "react";
import { calculateMonthlyPayment } from "../../../utils/loanCalculations";

const LoanDataComponent = (defaultTerm, defaultPercentage) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [estimatedVehiclePrice, setEstimatedVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");

  const [selectedTerm, setSelectedTerm] = useState(defaultTerm);
  const [selectedPercentage, setSelectedPercentage] =
    useState(defaultPercentage);
  const [selectedVehicle, setSelectedVehicle] = useState("Car/Pickup/SUV");

  const selectTerm = (term) => {
    setSelectedTerm(term === selectedTerm ? "" : term);
  };

  const selectPercentage = (percentage) => {
    setSelectedPercentage(percentage === selectedPercentage ? "" : percentage);
  };

  const selectVehicle = (vehicle) => {
    setSelectedVehicle(vehicle === selectedVehicle ? "" : vehicle);
  };

  useEffect(() => {
    if (
      !estimatedVehiclePrice ||
      isNaN(parseFloat(estimatedVehiclePrice)) ||
      !selectedPercentage ||
      !selectedTerm
    ) {
      setLoanAmount("");
      setDownPayment("");
      return;
    }

    const monthlyPayment = calculateMonthlyPayment(
      parseFloat(estimatedVehiclePrice),
      parseFloat(selectedPercentage),
      parseFloat(selectedTerm)
    );

    setDownPayment(monthlyPayment.downPayment);
    setLoanAmount(monthlyPayment.loanAmount);
  }, [estimatedVehiclePrice, selectedPercentage, selectedTerm]);

  // TODO: return JSX
  return {
    loanAmount,
    setLoanAmount,
    estimatedVehiclePrice,
    setEstimatedVehiclePrice,
    downPayment,
    setDownPayment,
    selectedTerm,
    selectTerm,
    selectedPercentage,
    selectPercentage,
    selectedVehicle,
    selectVehicle,
  };
};

export default LoanDataComponent;
