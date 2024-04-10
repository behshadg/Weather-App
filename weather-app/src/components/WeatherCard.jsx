import React, { useState, useEffect } from 'react';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    };

    fetch(
      'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=VanAVMlzvDr9u4SCh5q7zAR1m3IQYtKn',
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log('Weather data:', data);
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className="weather-card">
      <h2>Weather Information</h2>
      {weatherData && weatherData.timelines && weatherData.timelines.hourly && (
        <div>
          <p>Temperature: {weatherData.timelines.hourly[0].temperature}</p>
          <p>Humidity: {weatherData.timelines.hourly[0].humidity}</p>
          {/* Add more weather data properties as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
