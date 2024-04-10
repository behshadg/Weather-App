// App.js
import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import ErrorComponent from './components/ErrorComponent';
import UnitSwitcher from './components/UnitSwitcher';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default unit: Celsius

  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(
        'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=VanAVMlzvDr9u4SCh5q7zAR1m3IQYtKn'
      );
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  const handleSearch = (query) => {
    fetchWeatherData(query);
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (weatherData) {
      fetchWeatherData(weatherData.name); // Refresh weather data with new unit
    }
  };

  return (
    <div className="app">
      <h1>Weather Application</h1>
      <SearchBar onSearch={handleSearch} />
      <UnitSwitcher unit={unit} onUnitChange={handleUnitChange} />
      {error && <ErrorComponent message={error} />}
      {weatherData && (
        <>
          <WeatherCard weatherData={weatherData} unit={unit} />
          <ForecastCard unit={unit} />
        </>
      )}
    </div>
  );
}

export default App;
// const api = {
//   key: '6d2d14a469ad378aad0c974c9b5d85c3',
//   base: 'https://api.openweathermap.org/data/2.5/',
// };
// function App() {
//   const [search, setSearch] = useState('');

//   const searchPressed = () => {
//     fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
//       .then((res) => res.json())
//       .then((result) => {
//         console.log(result);
//       });
//   };
//   return (
//     <div>
//       <header>
//         {/* header */}
//         <h1>Weather App</h1>
//         {/* //search box */}

//         <div>
//           <input
//             type="text"
//             placeholder="Enter city/town..."
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button onClick={searchPressed}>Search</button>
//         </div>

//         {/* //location  */}
//         <p>New York City, USA</p>

//         {/* //temperature f/c  */}
//         <p>32 *F</p>

//         {/* //condition: sunny */}
//         <p>Sunny</p>
//       </header>
//     </div>
//   );
// }
// export default App;
