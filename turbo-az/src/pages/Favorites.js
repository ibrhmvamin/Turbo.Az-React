import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "../components/CarList.css";

export default function Favorites() {
  const [favCars, setFavCars] = useState(() => {
    const savedCars = Cookies.get("likedCars");
    return savedCars ? JSON.parse(savedCars) : [];
  });

  const cars = useSelector((state) => state.cars.cars);

  const favoriteCarDetails = cars.filter((car) => favCars.includes(car.id));

  useEffect(() => {
    Cookies.set("likedCars", JSON.stringify(favCars));
  });

  const toggleLike = (id) => {
    const updatedFavCars = favCars.includes(id)
      ? favCars.filter((carId) => carId !== id)
      : [...favCars, id];

    setFavCars(updatedFavCars);
  };

  const emptyFavoritesStyle = {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "50px",
  };

  const favoritesStyle = {
    textAlign: "center",
    marginTop: "50px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  return (
    <div
      style={
        favoriteCarDetails.length === 0 ? emptyFavoritesStyle : favoritesStyle
      }
    >
      {favoriteCarDetails.length === 0 ? (
        <>
          <img
            style={{
              alignSelf: "center",
              marginTop: "130px",
              marginBottom: "27px",
            }}
            src="https://turbo.azstatic.com/assets/shared/bookmarks/bookmarks-bg-da37770522e510318ac5c34e9532f2c28225f6e90d3a5736176dadd131f973db.svg"
            alt="empty favorites"
          />
          <p>
            Bəyəndiyiniz elanları ürək işarəsinə klik edərək seçilmişlərə əlavə
            edin.
          </p>
        </>
      ) : (
        <ul className="car-list">
          {favoriteCarDetails.map((car) => (
            <li className="car" key={car.id}>
              {car.Images && car.Images.length > 0 && (
                <img src={car.Images[0]} alt="car" />
              )}
              <FontAwesomeIcon
                onClick={() => toggleLike(car.id)}
                icon={faHeart}
                className={`heart-icon ${
                  favCars.includes(car.id) ? "liked" : ""
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
