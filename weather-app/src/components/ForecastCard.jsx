import React from 'react';

function ForecastCard({ forecast }) {
  // Convert Unix timestamp to milliseconds
  const forecastDate = new Date(forecast.dt * 1000);
  // Extract date and time parts
  const date = forecastDate.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
  const time = forecastDate.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="forecast-card">
      <div className="forecast-icon">
        <img
          src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
          alt={forecast.weather[0].description}
        />
      </div>
      <div className="forecast-details">
        <p className="forecast-date">Date: {date}</p>
        <p className="forecast-time">Time: {time}</p>
        <p className="forecast-temperature">
          {Math.round(forecast.main.temp)}°C
        </p>
        <p className="forecast-description">
          {forecast.weather[0].description}
        </p>
      </div>
    </div>
  );
}

export default ForecastCard;
