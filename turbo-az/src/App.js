import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Provider } from "react-redux";
import {
  faHeart,
  faUser,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import Home from "./pages/Home";
import { store } from "./app/store";
import NewAnnouncement from "./pages/NewAnnouncement";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <header>
            <img
              src="https://mlb2.adriver.ru/images/0010783/0010783505/0/desktop.jpg"
              border="0"
              alt="AdRiver"
              style={{ display: "inline", height: "100%", maxWidth: "100%" }}
            />
            <div className="support">
              <ul>
                <li>Tap.az</li>
                <li>Bina.az</li>
                <li>Boss.az</li>
              </ul>
              <div>
                <p>Dəstək: (012) 505-77-55</p>
                <p>Yardım</p>
                <p>RU</p>
                <div>
                  <div>
                    <FontAwesomeIcon icon={faHeart} />
                    <p>Seçilmişlər</p>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faUser} />
                    <p>Giriş</p>
                  </div>
                </div>
              </div>
            </div>
            <nav className="links">
              <ul>
                <li>
                  <Link className="link logo" to="/">
                    TURBO.AZ
                  </Link>
                </li>
                <li>
                  <Link className="link favorites" to="/favorites">
                    Favoritlər
                  </Link>
                </li>
                <li>
                  <Link className="link announcement" to="/new-car">
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      style={{ marginRight: "4px", marginLeft: "2px" }}
                    />{" "}
                    Yeni elan
                  </Link>
                </li>
              </ul>
            </nav>
          </header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-car" element={<NewAnnouncement />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;