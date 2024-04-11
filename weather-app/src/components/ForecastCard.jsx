import React from 'react';

const ForecastCard = ({ forecast }) => {
  const forecastDate = new Date(forecast.dt * 1000);
  const formattedDate = forecastDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = forecastDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
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
        <p className="forecast-date">{formattedDate}</p>
        <p className="forecast-time">{formattedTime}</p>{' '}
        {/* Display the time */}
        <p className="forecast-temperature">
          {Math.round(forecast.main.temp)}°C
        </p>
        <p className="forecast-description">
          {forecast.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default ForecastCard;
