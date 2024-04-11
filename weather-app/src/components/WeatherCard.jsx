// components/WeatherCard.js
// import React from 'react';

// const WeatherCard = ({ location, weatherData }) => {
//   return (
//     <div className="weather-card">
//       <div className="weather-card-header">
//         <h3 className="location">{location}</h3>
//         <div className="weather-icon">
//           <img
//             src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
//             alt={weatherData.weather[0].description}
//           />
//         </div>
//       </div>
//       <div className="weather-card-body">
//         <div className="temperature">
//           <span className="value">{Math.round(weatherData.main.temp)}</span>
//           <span className="unit">°C</span>
//         </div>
//         <div className="weather-description">
//           <p>{weatherData.weather[0].description}</p>
//         </div>
//         <div className="weather-details">
//           <div className="detail">
//             <i className="fas fa-tint"></i>
//             <span>{weatherData.main.humidity}%</span>
//           </div>
//           <div className="detail">
//             <i className="fas fa-wind"></i>
//             <span>{weatherData.wind.speed} m/s</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WeatherCard;

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import '../WeatherCard.css';
import ForecastCard from './ForecastCard';

const WeatherCard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [showBackButton, setShowBackButton] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  const fetchData = async () => {
    if (city.trim() === '') return;

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6d2d14a469ad378aad0c974c9b5d85c3`
      );

      const {
        coord: { lat, lon },
      } = weatherResponse.data;

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=6d2d14a469ad378aad0c974c9b5d85c3`
      );

      setWeatherData(weatherResponse.data);
      const sortedForecastData = forecastResponse.data.list.sort(
        (a, b) => a.dt - b.dt
      );
      setForecastData(sortedForecastData);
      setShowBackButton(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      setWeatherData(null);
      setForecastData([]);
      setShowBackButton(false);
    }
  };

  const debouncedFetchData = useCallback(() => {
    fetchData();
  }, [city]);

  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(debouncedFetchData, 500);
    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [city, debouncedFetchData]);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleBackButton = () => {
    setCity('');
    setWeatherData(null);
    setForecastData([]);
    setShowBackButton(false);
  };

  return (
    <div className="weather-card">
      <h1>Weather Forecast</h1>
      {showBackButton && (
        <button className="back-button" onClick={handleBackButton}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      )}

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
      />
      {weatherData ? (
        <div className="weather-container">
          <CurrentWeather weatherData={weatherData} />
          <Forecast forecastData={forecastData} />
        </div>
      ) : (
        <p>Please enter a city to see the weather.</p>
      )}
    </div>
  );
};

const CurrentWeather = ({ weatherData }) => (
  <div className="current-weather">
    <h2>{weatherData.name}</h2>
    <div className="temperature">{weatherData.main.temp}°C</div>
    <WeatherDetails weatherData={weatherData} />
    <WeatherIcon weatherData={weatherData} />
    <SunTimes weatherData={weatherData} />
  </div>
);

const WeatherDetails = ({ weatherData }) => (
  <div className="weather-details">
    <Detail label="Feels Like" value={`${weatherData.main.feels_like}°C`} />
    <Detail label="Wind" value={`${weatherData.wind.speed} m/s`} />
    <Detail label="Humidity" value={`${weatherData.main.humidity}%`} />
    <Detail label="Rain" value="N/A mm" />
  </div>
);

const Detail = ({ label, value }) => (
  <div className="detail">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const WeatherIcon = ({ weatherData }) => (
  <div className="weather-icon">
    <img
      src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
      alt={weatherData.weather[0].description}
    />
    <span>{weatherData.weather[0].description}</span>
  </div>
);

const SunTimes = ({ weatherData }) => (
  <div className="sun-times">
    <Time label="Sunrise" time={weatherData.sys.sunrise} />
    <Time label="Sunset" time={weatherData.sys.sunset} />
  </div>
);

const Time = ({ label, time }) => (
  <div>
    <span>{label}</span>
    <span>{new Date(time * 1000).toLocaleTimeString()}</span>
  </div>
);

const Forecast = ({ forecastData }) => {
  const groupedForecast = groupForecastByDay(forecastData);

  return (
    <div className="forecast-container">
      {Object.entries(groupedForecast).map(([day, forecasts]) => (
        <div key={day}>
          <h3>{day}</h3>
          {forecasts.map((forecast, index) => (
            <ForecastCard key={index} forecast={forecast} />
          ))}
        </div>
      ))}
    </div>
  );
};

const groupForecastByDay = (forecastData) => {
  const groupedForecast = {};
  forecastData.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);
    const day = date.toDateString();
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    if (!groupedForecast[day]) {
      groupedForecast[day] = [];
    }
    groupedForecast[day].push(forecast);
  });
  return groupedForecast;
};

export default WeatherCard;
