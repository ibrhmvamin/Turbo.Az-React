import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarById } from "../features/carSlice";

export default function CarDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.cars.car);

  useEffect(() => {
    if (id) {
      dispatch(fetchCarById(id)).catch((err) => console.err(err.message));
    }
  }, [dispatch, id]);

  console.log("car", car);

  return (
    <div className="car-detail">
      <p>{car.id}</p>
    </div>
  );
}
