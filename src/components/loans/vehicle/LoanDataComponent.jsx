import { useState, useEffect } from "react";
import { calculateMonthlyPayment } from "../../../utils/loanCalculations";

const LoanDataComponent = (defaultTerm, defaultPercentage) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [estimatedVehiclePrice, setEstimatedVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");

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

  const CommaSeparated = (param) => {
    let convertParam = parseFloat(param);

    return convertParam.toLocaleString("en", {
      useGrouping: true,
      minimumFractionDigits: 2,
    });
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
      setMonthlyPayment("");
      return;
    }

    const monthlyPayment = calculateMonthlyPayment(
      parseFloat(estimatedVehiclePrice),
      parseFloat(selectedPercentage),
      parseFloat(selectedTerm)
    );
    setDownPayment(CommaSeparated(monthlyPayment.downPayment));
    setLoanAmount(CommaSeparated(monthlyPayment.loanAmount));
    setMonthlyPayment(CommaSeparated(monthlyPayment.monthlyPayment));
  }, [estimatedVehiclePrice, selectedPercentage, selectedTerm]);

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
    monthlyPayment,
    setMonthlyPayment,
  };
};

export default LoanDataComponent;
