import "../styles/App.css";
import { useEffect, useState } from "react";
import { base, key } from "./apikeys";
import loader from "../assets/WeatherIcons.gif";
import CurrentLocation from "./CurrentLocation.jsx";
import Forcast from "./Forcast.jsx";

function App() {
  const [state, setState] = useState({
    lat: undefined,
    lon: undefined,
    temperatureC: undefined,
    icon: "",
    city: undefined,
    country: undefined,
    humidity: undefined,
    feelslike: undefined,
    windspeed: undefined,
    description: undefined,
  });
  useEffect(() => {
    if (navigator.geolocation) {
      getPosition()
        //If user allow location service then will fetch data & send it to get-weather function.
        .then((position) => {
          getWeather(position.coords.latitude, position.coords.longitude);
        })
        .catch((err) => {
          //If user denied location service then standard location weather will le shown on basis of latitude & latitude.
          // getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
    const timerID = setInterval(() => getWeather(state.lat, state.lon), 600000);
    clearInterval(timerID);
  });
  const getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };
  const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${key}`
    );
    const data = await api_call.json();
    setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp) + "°C",
      humidity: data.main.humidity + "%",
      feelslike: Math.round(data.main.feels_like) + "°C",
      windspeed: Math.round(data.wind.speed) + " km/hr",
      description: data.weather[0].main,
      country: data.sys.country,
      icon: data.weather[0].icon,
    });
  };

  if (state.temperatureC) {
    return (
      <div className="container">
        <CurrentLocation
          temp={state.temperatureC}
          city={state.city}
          icon={state.icon}
          description={state.description}
          humidity={state.humidity}
          feelslike={state.feelslike}
          windspeed={state.windspeed}
          country={state.country}
        />
        <Forcast />
      </div>
    );
  } else {
    return (
      <div
        className="container"
        style={{
          background: "#000000b6",
          width: "35rem",
          height: " 30rem",
          Display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
        <h3 style={{ color: "white", fontSize: "20px", fontWeight: "600" }}>
          Detecting your location
        </h3>
        <h3
          style={{
            color: "white",
            marginTop: "10px",
            fontSize: "16px",
            fontWeight: "200",
          }}
        >
          Your current location wil be displayed on the App <br></br> & used for
          calculating Real time weather.
        </h3>
      </div>
    );
  }
}
export default App;
