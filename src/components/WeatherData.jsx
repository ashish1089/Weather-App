import "../styles/weatherdata.css";
export default function WeatherData(props) {
  return (
    <div className="weather-data">
      <div className="feels-like">
        <p>{props.feelslike}</p>
        <p>Feels like</p>
      </div>
      <div className="humidity">
        <p>{props.humidity}</p>
        <p>Humidity</p>
      </div>
      <div className="windspeed">
        <p>{props.windspeed}</p>
        <p>Wind Speed</p>
      </div>
    </div>
  );
}
