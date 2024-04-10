// components/UnitSwitcher.js
import React from 'react';

function UnitSwitcher({ unit, onUnitChange }) {
  const handleChange = (e) => {
    onUnitChange(e.target.value);
  };

  return (
    <div className="unit-switcher">
      <label>
        <input
          type="radio"
          value="metric"
          checked={unit === 'metric'}
          onChange={handleChange}
        />
        Celsius
      </label>
      <label>
        <input
          type="radio"
          value="imperial"
          checked={unit === 'imperial'}
          onChange={handleChange}
        />
        Fahrenheit
      </label>
    </div>
  );
}

export default UnitSwitcher;
