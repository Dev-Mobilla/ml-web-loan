import { useState } from "react";
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

  const monthlyPayment = calculateMonthlyPayment(
    parseFloat(estimatedVehiclePrice),
    parseFloat(downPayment),
    parseFloat(loanAmount),
    0.1,
    selectedTerm,
    selectedPercentage
  );

  const [formData, setFormData] = useState({
    year: "",
    make: "",
    model: "",
    color: "",
    plateNo: "",
    engineNo: "",
    chassisNo: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
    formData,
    setFormData,
    handleSubmit,
    handleChange,
  };
};

export default LoanDataComponent;
