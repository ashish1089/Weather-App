import "../styles/currentlocation.css";
import DateTime from "./DateTime";
import WeatherData from "./WeatherData";

function CurrentLocation(props) {
  console.log(props.icon);
  return (
    <div className=" current-location">
      <div className="user-data ">
        <div className="user_weather">
          <div className="user_temp">
            <h1>{props.temp}</h1>
          </div>
          <div className="user__location">
            <div className="city">{props.city}</div>
            <img
              src={`https://openweathermap.org/img/wn/${props.icon}.png`}
              alt={props.description}
            />
          </div>
        </div>
        <p>{props.country}</p>
      </div>
      <WeatherData
        humidity={props.humidity}
        feelslike={props.feelslike}
        windspeed={props.windspeed}
      />

      <DateTime />
    </div>
  );
}

export default CurrentLocation;
