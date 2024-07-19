import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
// import { useForm } from "react-hook-form";
import { addCar } from "../features/carSlice";
import "./CarForm.css";

export default function CarForm({ currentCar, setCurrentCar }) {
  const validatePhone = (phone) => {
    const phoneRegex = /^(?:050|051|055|070|077|099|012)\d{7}$/;
    return phoneRegex.test(phone);
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
    IsCredit: "",
    IsBarter: "",
    CarsOwner: "",
    OwnerPhone: "",
    Images: ["", ""],
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentCar) {
      setFormData(currentCar);
    }
  }, [currentCar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Images") {
      const updatedImages = [...formData.Images];
      updatedImages[0] = value;

      setFormData({ ...formData, Images: updatedImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!validatePhone(formData.OwnerPhone)) {
      newErrors.OwnerPhone = "Invalid phone number format";
    }
    setErrors(newErrors);

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
      IsCredit: "",
      IsBarter: "",
      CarsOwner: "",
      OwnerPhone: "",
      Images: ["", ""],
    });
    setCurrentCar(null);
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <div className="form-left">
        <input
          required
          name="Mark"
          value={formData.Mark}
          onChange={handleChange}
          placeholder="Marka"
        />
        <input
          required
          name="Model"
          value={formData.Model}
          onChange={handleChange}
          placeholder="Model"
        />
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
        <input
          required
          name="BanType"
          value={formData.BanType}
          onChange={handleChange}
          placeholder="Ban Type"
        />
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
        <input
          name="IsCredit"
          value={formData.IsCredit}
          onChange={handleChange}
          placeholder="Is Credit"
        />
        <input
          name="IsBarter"
          value={formData.IsBarter}
          onChange={handleChange}
          placeholder="Is Barter"
        />
        <input
          required
          name="CarsOwner"
          value={formData.CarsOwner}
          onChange={handleChange}
          placeholder="Cars Owner"
        />
        <input
          required
          name="OwnerPhone"
          value={formData.OwnerPhone}
          onChange={handleChange}
          placeholder="OwnerPhone"
        />
        {errors.OwnerPhone && <p className="error">{errors.OwnerPhone}</p>}
        <input
          required
          name="Images"
          value={formData.Images[0]}
          onChange={handleChange}
          placeholder="Image 1"
        />
        <input
          name="Images"
          value={formData.Images[1]}
          onChange={handleChange}
          placeholder="Image 2"
        />
        <div>
          <button type="submit">Add Car</button>
        </div>
      </div>
    </form>
  );
}
