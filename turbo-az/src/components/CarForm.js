import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { addCar } from "../features/carSlice";
import "./CarForm.css";

export default function CarForm({ currentCar, setCurrentCar }) {
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
    Images: ["", ""], // Initialize with two empty strings
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
      Images: ["", ""],
    });
    setCurrentCar(null);
  };

  return (
    <form onSubmit={handleSubmit} className="car-form">
      <div className="form-left">
        <input
          name="Mark"
          value={formData.Mark}
          onChange={handleChange}
          placeholder="Marka"
        />
        <input
          name="Model"
          value={formData.Model}
          onChange={handleChange}
          placeholder="Model"
        />
        <input
          name="Year"
          value={formData.Year}
          onChange={handleChange}
          placeholder="Year"
        />
        <input
          name="Price"
          value={formData.Price}
          onChange={handleChange}
          placeholder="Price"
        />
        <input
          name="EngineVolume"
          value={formData.EngineVolume}
          onChange={handleChange}
          placeholder="Engine Volume"
        />
        <input
          name="GearBox"
          value={formData.GearBox}
          onChange={handleChange}
          placeholder="Gear Box"
        />
        <input
          name="BanType"
          value={formData.BanType}
          onChange={handleChange}
          placeholder="Ban Type"
        />
      </div>
      <div className="form-right">
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input
          name="Miles"
          value={formData.Miles}
          onChange={handleChange}
          placeholder="Miles"
        />
        <input
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
          name="CarsOwner"
          value={formData.CarsOwner}
          onChange={handleChange}
          placeholder="Cars Owner"
        />
        <input
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
