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
  const filter = useSelector((state) => state.cars.filter);
  const dispatch = useDispatch();

  const [likedCars, setLikedCars] = useState(() => {
    const savedLikedCars = Cookies.get("likedCars");
    return savedLikedCars ? JSON.parse(savedLikedCars) : [];
  });

  useEffect(() => {
    dispatch(fetchCars());
    Cookies.set("likedCars", JSON.stringify(likedCars), { expires: 1 });
  }, [dispatch, likedCars]);

  const toggleLike = (id) => {
    if (likedCars.includes(id)) {
      setLikedCars(likedCars.filter((carId) => carId !== id));
    } else {
      setLikedCars([...likedCars, id]);
    }
  };

  const applyFilter = (car) => {
    const {
      vendor,
      model,
      city,
      minPrice,
      maxPrice,
      banType,
      minYear,
      maxYear,
      IsCredit,
      IsBarter,
    } = filter;

    const matchesVendor = vendor ? car.Mark === vendor : true;
    const matchesModel = model ? car.Model === model : true;
    const matchesCity = city ? car.City === city : true;
    const matchesPrice =
      (minPrice ? car.Price >= minPrice : true) &&
      (maxPrice ? car.Price <= maxPrice : true);
    const matchesBanType = banType ? car.BanType === banType : true;
    const matchesYear =
      (minYear ? car.Year >= minYear : true) &&
      (maxYear ? car.Year <= maxYear : true);
    const matchesCredit = IsCredit ? car.IsCredit === IsCredit : true;
    const matchesBarter = IsBarter ? car.IsBarter === IsBarter : true;

    return (
      matchesVendor &&
      matchesModel &&
      matchesCity &&
      matchesPrice &&
      matchesBanType &&
      matchesYear &&
      matchesCredit &&
      matchesBarter
    );
  };

  const filteredCars = cars.filter(applyFilter);

  return (
    <section className="cars">
      <ul>
        {filteredCars.map((car) => (
          <li className="car" key={car.id}>
            <FontAwesomeIcon
              onClick={() => toggleLike(car.id)}
              icon={faHeart}
              className={`heart-icon ${
                likedCars.includes(car.id) ? "liked" : ""
              }`}
            />
            <Link style={{ textDecoration: "none" }} to={`/cars/${car.id}`}>
              {car.Images && car.Images.length > 0 && (
                <img src={car.Images} alt="car" />
              )}
              <div>
                <h3>{car.Price} AZN</h3>
                <p style={{ lineHeight: "19px", margin: "3px 0" }}>
                  {car.Mark} {car.Model}
                </p>
                <div className="texts">
                  <p>{car.Year},</p>
                  <p>{car.EngineVolume} L,</p>
                  <p>{car.Miles} km</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
