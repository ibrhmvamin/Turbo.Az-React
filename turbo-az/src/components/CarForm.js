import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { addCar } from "../features/carSlice";
import "./CarForm.css";

export default function CarForm({ currentCar, setCurrentCar }) {
  const validatePhone = (phone) => {
    const phoneRegex = /^(?:050|051|055|070|077|099|012|010)\d{7}$/;
    return phoneRegex.test(phone);
  };

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

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    Mark: "",
    Model: "",
    Year: "",
    Price: "",
    EngineVolume: "",
    GearBox: "",
    BanType: "",
    Description: "",
    Miles: "",
    City: "",
    IsCredit: false,
    IsBarter: false,
    CarsOwner: "",
    OwnerPhone: "",
    Images: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCar) {
      setFormData(currentCar);
    }
  }, [currentCar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validatePhone(formData.OwnerPhone)) {
      newErrors.OwnerPhone = "Invalid phone number format";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    dispatch(addCar(formData));

    setFormData({
      Mark: "",
      Model: "",
      Year: "",
      Price: "",
      EngineVolume: "",
      GearBox: "",
      BanType: "",
      Description: "",
      Miles: "",
      City: "",
      IsCredit: false,
      IsBarter: false,
      CarsOwner: "",
      OwnerPhone: "",
      Images: "",
    });
    setCurrentCar(null);
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <div className="form-left">
        <select
          required
          name="Mark"
          value={formData.Mark}
          onChange={handleChange}
        >
          <option value="">Select Brand</option>
          {carVendors.map((vendor, index) => (
            <option key={index} value={vendor}>
              {vendor}
            </option>
          ))}
        </select>

        <select
          required
          name="Model"
          value={formData.Model}
          onChange={handleChange}
          disabled={!formData.Mark}
        >
          <option value="">Select Model</option>
          {formData.Mark && carModels[formData.Mark] ? (
            carModels[formData.Mark].map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))
          ) : (
            <option value="" disabled>
              Select a brand first
            </option>
          )}
        </select>

        <input
          required
          name="Year"
          value={formData.Year}
          onChange={handleChange}
          placeholder="Year"
        />
        <input
          required
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          required
          name="EngineVolume"
          value={formData.EngineVolume}
          onChange={handleChange}
          placeholder="Engine Volume"
        />
        <input
          required
          name="GearBox"
          value={formData.GearBox}
          onChange={handleChange}
          placeholder="Gear Box"
        />
        <select
          required
          name="BanType"
          value={formData.BanType}
          onChange={handleChange}
        >
          <option value="">Select Ban Type</option>
          {[
            "Limuzin",
            "Sedan",
            "Minivan",
            "Off-Road",
            "Motosiklet",
            "Touring",
          ].map((ban, index) => (
            <option key={index} value={ban}>
              {ban}
            </option>
          ))}
        </select>
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Description"
        />
      </div>
      <div className="form-right">
        <input
          required
          name="Miles"
          value={formData.Miles}
          onChange={handleChange}
          placeholder="Miles"
        />
        <input
          required
          name="City"
          value={formData.City}
          onChange={handleChange}
          placeholder="City"
        />
        <label>
          <input
            name="IsCredit"
            type="checkbox"
            checked={formData.IsCredit}
            onChange={handleChange}
          />
          Credit
        </label>
        <label>
          <input
            name="IsBarter"
            type="checkbox"
            checked={formData.IsBarter}
            onChange={handleChange}
          />
          Barter
        </label>
        <input
          required
          name="CarsOwner"
          value={formData.CarsOwner}
          onChange={handleChange}
          placeholder="Car Owner"
        />
        <input
          required
          name="OwnerPhone"
          value={formData.OwnerPhone}
          onChange={handleChange}
          placeholder="Owner Phone"
        />
        {errors.OwnerPhone && <p className="error">{errors.OwnerPhone}</p>}
        <input
          required
          name="Images"
          value={formData.Images}
          onChange={handleChange}
          placeholder="Image URL"
        />

        <div>
          <button type="submit">Add Car</button>
        </div>
      </div>
    </form>
  );
}
