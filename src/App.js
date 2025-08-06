import React, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (e) {
        console.error("Error fetching data: ", e);
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const renderCountries = () => {
    if (loading) {
      return (
        <div className="loading-container">
          <p className="loading-text">Loading...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="error-container">
          <p className="error-text">{error}</p>
        </div>
      );
    }
    if (countries.length === 0) {
      return (
        <div className="empty-container">
          <p className="empty-text">No countries found.</p>
        </div>
      );
    }

    return (
      <div className="country-grid-container">
        {countries.map((country, index) => (
          <div key={index} className="country-card">
            <img
              src={country.flag}
              alt={`${country.name} flag`}
              className="country-flag"
            />
            <h2 className="country-name">{country.name}</h2>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="header-title">Country Flags</h1>
      </header>
      <main className="main-content">{renderCountries()}</main>
    </div>
  );
}

export default App;