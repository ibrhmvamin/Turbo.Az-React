import React, { useState } from "react";
import "../App.css";

export default function CarFilter({ currentCar, setCurrentCar }) {
  const carVendors = [
    "Toyota",
    "BMW",
    "Porsche",
    "Ford",
    "Chevrolet",
    "Honda",
    "Nissan",
    "Audi",
    "Mercedes-Benz",
    "Volkswagen",
    "Subaru",
    "Lexus",
    "Mazda",
    "Hyundai",
    "Kia",
    "Volvo",
    "Jeep",
    "Tesla",
    "Ferrari",
    "Lamborghini",
  ];

  const carModels = {
    Toyota: ["Camry", "Corolla", "Rav4", "Highlander", "Prius", "Land Cruiser"],
    BMW: ["X5", "3 Series", "X3", "7 Series", "X1", "5 Series"],
    Porsche: ["911", "Cayenne", "Panamera", "Macan", "Boxster", "Taycan"],
    Ford: ["Mustang", "F-150", "Escape", "Explorer", "Focus", "Edge"],
    Chevrolet: [
      "Silverado",
      "Tahoe",
      "Malibu",
      "Equinox",
      "Camaro",
      "Traverse",
    ],
    Honda: ["Accord", "Civic", "CR-V", "Pilot", "Odyssey", "Fit"],
    Nissan: ["Altima", "Maxima", "Rogue", "Sentra", "Pathfinder", "Frontier"],
    Audi: ["A4", "Q5", "A3", "Q7", "A6", "Q3"],
    "Mercedes-Benz": [
      "C-Class",
      "E-Class",
      "GLC",
      "S-Class",
      "G-Class",
      "A-Class",
    ],
    Volkswagen: ["Jetta", "Passat", "Tiguan", "Atlas", "Golf", "Arteon"],
    Subaru: ["Outback", "Forester", "Impreza", "Crosstrek", "Legacy", "Ascent"],
    Lexus: ["RX", "IS", "NX", "ES", "LS", "GX"],
    Mazda: ["CX-5", "Mazda3", "CX-9", "MX-5", "Mazda6", "CX-30"],
    Hyundai: ["Sonata", "Tucson", "Santa Fe", "Elantra", "Kona", "Palisade"],
    Kia: ["Sorento", "Optima", "Sportage", "Telluride", "Forte", "Soul"],
    Volvo: ["XC90", "XC60", "S60", "V90", "XC40", "S90"],
    Jeep: [
      "Grand Cherokee",
      "Wrangler",
      "Cherokee",
      "Compass",
      "Renegade",
      "Gladiator",
    ],
    Tesla: [
      "Model S",
      "Model 3",
      "Model X",
      "Model Y",
      "Roadster",
      "Cybertruck",
    ],
    Ferrari: [
      "488 GTB",
      "812 Superfast",
      "F8 Tributo",
      "Portofino",
      "SF90 Stradale",
      "Roma",
    ],
    Lamborghini: [
      "Huracan",
      "Aventador",
      "Urus",
      "Sian",
      "Centenario",
      "Diablo",
    ],
  };

  //   const [filterData, setFilterData] = useState({
  //     vendor: "",
  //     model: "",
  //   });

  const [selectedVendor, setSelectedVendor] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleVendorChange = (e) => {
    setSelectedVendor(e.target.value);
    setSelectedModel("");
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  return (
    <div
      style={{
        paddingLeft: "100px",
        paddingRight: "100px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      <select value={selectedVendor} onChange={handleVendorChange}>
        <option value="">Marka</option>
        {carVendors.map((vendor, index) => (
          <option key={index} value={vendor}>
            {vendor}
          </option>
        ))}
      </select>
      <select
        value={selectedModel}
        onChange={handleModelChange}
        disabled={!selectedVendor}
      >
        <option value="">Model</option>
        {selectedVendor && carModels[selectedVendor] ? (
          carModels[selectedVendor].map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))
        ) : (
          <option disabled={!selectedVendor}>Select a brand first</option>
        )}
      </select>
    </div>
  );
}
