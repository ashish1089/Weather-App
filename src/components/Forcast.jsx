import "../styles/forcast.css";
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherData from "./WeatherData";
import { key, base } from "./apikeys";

function Forcast() {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  function getWeather(city) {
    axios
      .get(`${base}weather?q=${city}&units=metric&appid=${key}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
        setData({});
        setLocation("");
        setError({ message: "Not Found", query: location });
      });
  }

  useEffect(() => {
    getWeather("mumbai");
  }, []);

  const searchLocation = (e) => {
    if (e.key === "Enter" || e.key === undefined) {
      getWeather(location);
      setLocation("");
    }
  };
  const res = data.main ? <h1>hello</h1> : null;
  const temp = data.main ? data.main.temp.toFixed() + "°C" : "-";
  const description = data.weather ? data.weather[0].main : "-";
  const icon = data.weather ? data.weather[0].icon : null;
  const feels_like = data.main ? data.main.feels_like.toFixed() + "°C" : "-";
  const humidity = data.main ? data.main.humidity + "%" : "-";
  const windSpeed = data.wind ? data.wind.speed + "km/hr" : "-";
  return (
    <div className="forcast section">
      <div className="forcast__top">
        <input
          className="location"
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          type="text"
          placeholder="Search"
          value={location}
        />
        <button className="searchBtn" onClick={searchLocation}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#fff"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {!data.main ? (
        <p className="errorMsg">
          {error.query} {error.message}
        </p>
      ) : (
        <>
          <div className="location">
            <div className="weather">
              <h1 className="forcast__temp">{temp}</h1>
              <div className="city_desc">
                <p>{data.name}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${icon}.png`}
                  alt={description}
                />
              </div>
            </div>
          </div>
          <WeatherData
            humidity={humidity}
            feelslike={feels_like}
            windspeed={windSpeed}
          />
        </>
      )}
    </div>
  );
}
export default Forcast;
