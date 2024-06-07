import React, { useState } from "react";

import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function SearchBox(props) {
  const [cityName, setCityName] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };
  function searchDataClose() {
    setWeather("");
    setCityName(null);
    setError(null);
  }
  async function search() {
    if (cityName.trim() === "") return; // Prevent searching if the query is empty
    try {
      const response = await fetch(
        `${apiKeys?.base}/weather?q=${encodeURIComponent(
          cityName
        )}&units=metric&APPID=${apiKeys?.key}`
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setWeather(data);
        setCityName("");
        setError(null);
      } else {
        setWeather(null);
        setCityName("");
        setError({ message: "Not Found in then Earth", cityName: cityName  });
      }
    } catch (error) {
      console.error(error);
      setWeather(null);
      setCityName("");
      setError({ message: "Not Found", cityName: cityName });
    }
  }

  return (
    <div className="forecast">
      <div className="today-weather">
        <div className="search-item">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setCityName(e.target.value)}
            value={cityName}
          />
        </div>
        <div className="img-box">
          <button
            onClick={search}
            className="bg-transparent border-0 text-light fw-bold fs-3"
          >
            <i className="fas fa-search" aria-hidden="true"></i>
          </button>
        </div>

        <div className="search-data">
          <ul>
            {typeof weather?.main !== "undefined" ? (
              <div className="weather-forecast ">
                <button type="button text-light" onClick={searchDataClose}>
                  <i className="fa fa-close" aria-hidden="true"></i>
                </button>
                <div className="forecast-icon">
                  <ReactAnimatedWeather
                    icon={props.icon}
                    color={defaults.color}
                    size={defaults.size}
                    animate={defaults.animate}
                  />
                </div>
                <div className="forecast-data">
                  {" "}
                  <li className="cityHead">
                    <p>
                      {weather.name}, {weather.sys.country}
                    </p>
                    <img
                      // className="temp"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt=""
                    />
                  </li>
                  <li>
                    Temperature{" "}
                    <span className="temp">
                      {Math.round(weather.main.temp)}°c (
                      {weather.weather[0].main})
                    </span>
                  </li>
                  <li>
                    Humidity{" "}
                    <span className="temp">
                      {Math.round(weather.main.humidity)}%
                    </span>
                  </li>
                  <li>
                    Visibility{" "}
                    <span className="temp">
                      {Math.round(weather.visibility)} mi
                    </span>
                  </li>
                  <li>
                    Wind Speed{" "}
                    <span className="temp">
                      {Math.round(weather.wind.speed)} Km/h
                    </span>
                  </li>
                </div>
              </div>
            ) : (
              <li>
               {error?.cityName}  {error?.message} 
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default SearchBox;
