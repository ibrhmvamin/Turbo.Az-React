import React, { useEffect, useState } from "react";
import "./CarFilter.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/carSlice";

export default function CarFilter() {
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

  const azerbaijaniCities = [
    "Bakı",
    "Ganja",
    "Sumqayit",
    "Lankaran",
    "Mingachevir",
    "Sheki",
    "Shirvan",
    "Gabala",
    "Khachmaz",
    "Zagatala",
    "Guba",
    "Naftalan",
    "Agdam",
    "Agjabadi",
    "Khirdalan",
    "Yevlakh",
    "Bilasuvar",
    "Gazakh",
    "Tovuz",
  ];

  const banTypes = [
    "Limuzin",
    "Sedan",
    "Minivan",
    "Off-Road",
    "Motosiklet",
    "Touring",
  ];

  const [filterData, setFilterData] = useState({
    vendor: "",
    model: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    banType: "",
    minYear: "",
    maxYear: "",
    IsCredit: "",
    IsBarter: "",
  });

  const dispatch = useDispatch();
  const filteredCars = useSelector((state) => state.cars.filter);

  useEffect(() => {
    dispatch(setFilter(filterData));
  }, [filterData, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleFilterClick = () => {
    console.log("filteredCars", filteredCars);
  };

  return (
    <div className="filters" style={{ padding: "0" }}>
      <select name="vendor" value={filterData.vendor} onChange={handleChange}>
        <option value="">Marka</option>
        {carVendors.map((vendor, index) => (
          <option key={index} value={vendor}>
            {vendor}
          </option>
        ))}
      </select>
      <select
        name="model"
        value={filterData.model}
        onChange={handleChange}
        disabled={!filterData.vendor}
      >
        <option value="">Model</option>
        {filterData.vendor && carModels[filterData.vendor] ? (
          carModels[filterData.vendor].map((model, index) => (
            <option key={index} value={model}>
              {model}
            </option>
          ))
        ) : (
          <option disabled={!filterData.vendor}>Select a brand first</option>
        )}
      </select>
      <select name="city" value={filterData.city} onChange={handleChange}>
        <option value="">City</option>
        {azerbaijaniCities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>
      <div className="price-range">
        <input
          name="minPrice"
          type="number"
          value={filterData.minPrice}
          onChange={handleChange}
          placeholder="Qiymət min."
          min="0"
        />
        <input
          name="maxPrice"
          type="number"
          value={filterData.maxPrice}
          onChange={handleChange}
          placeholder="maks."
          min="0"
        />
      </div>
      <select name="banType" value={filterData.banType} onChange={handleChange}>
        <option value="">Ban növü</option>
        {banTypes.map((ban, index) => (
          <option key={index} value={ban}>
            {ban}
          </option>
        ))}
      </select>
      <button className="credit-barter" value={filterData.IsCredit}>
        Kredit
      </button>
      <button className="credit-barter" value={filterData.IsBarter}>
        Barter
      </button>
      <div className="price-range">
        <input
          name="minYear"
          type="number"
          value={filterData.minYear}
          onChange={handleChange}
          placeholder="İl, min."
          min="0"
        />
        <input
          name="maxYear"
          type="number"
          value={filterData.maxYear}
          onChange={handleChange}
          placeholder="maks."
          min="0"
        />
      </div>
      <button onClick={handleFilterClick} className="filter-btn">
        Elanları göstər
      </button>
    </div>
  );
}
