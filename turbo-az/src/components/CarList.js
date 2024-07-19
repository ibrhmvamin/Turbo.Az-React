import React, { useEffect, useState } from "react";
import "./CarList.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../features/carSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function CarList() {
  const cars = useSelector((state) => state.cars.cars);
  const dispatch = useDispatch();

  const [likedCars, setLikedCars] = useState(() => {
    const savedLikedCars = Cookies.get("likedCars");
    return savedLikedCars ? JSON.parse(savedLikedCars) : [];
  });

  useEffect(() => {
    dispatch(fetchCars());
    Cookies.set("likedCars", JSON.stringify(likedCars), { expires: 1 });
  }, [likedCars]);

  const toggleLike = (id) => {
    if (likedCars.includes(id)) {
      setLikedCars(likedCars.filter((carId) => carId !== id));
    } else {
      setLikedCars([...likedCars, id]);
    }
  };

  return (
    <section className="cars">
      <ul>
        {cars.map((car) => (
          <li className="car" key={car.id}>
            <Link style={{ textDecoration: "none" }} to={`/cars/${car.id}`}>
              {car.Images && car.Images.length > 0 && (
                <img src={car.Images[0]} alt="car" />
              )}
              <FontAwesomeIcon
                onClick={() => toggleLike(car.id)}
                icon={faHeart}
                className={`heart-icon ${
                  likedCars.includes(car.id) ? "liked" : ""
                }`}
              />
              <div>
                <h3>{car.Price}</h3>
                <p
                  style={{
                    lineHeight: "19px",
                    margin: "3px 0",
                  }}
                >
                  {car.Mark} {car.Model}
                </p>
                <div className="texts">
                  <p>{car.Year}</p>
                  <p>{car.EngineVolume}</p>
                  <p>{car.Miles}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
