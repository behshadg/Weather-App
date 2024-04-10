import React from 'react';

function ErrorComponent({ message }) {
  return (
    <div className="error">
      <p>{message}</p>
    </div>
  );
}

export default ErrorComponent;
