// components/WeatherCard.js
import React from 'react';

const WeatherCard = ({ location, weatherData }) => {
  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <h3 className="location">{location}</h3>
        <div className="weather-icon">
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      </div>
      <div className="weather-card-body">
        <div className="temperature">
          <span className="value">{Math.round(weatherData.main.temp)}</span>
          <span className="unit">°C</span>
        </div>
        <div className="weather-description">
          <p>{weatherData.weather[0].description}</p>
        </div>
        <div className="weather-details">
          <div className="detail">
            <i className="fas fa-tint"></i>
            <span>{weatherData.main.humidity}%</span>
          </div>
          <div className="detail">
            <i className="fas fa-wind"></i>
            <span>{weatherData.wind.speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
