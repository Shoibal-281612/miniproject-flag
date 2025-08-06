import React, { useState, useEffect } from "react";

// The main application component
export default function App() {
  // State to hold the fetched country data
  const [countries, setCountries] = useState([]);
  // State to manage the loading status
  const [loading, setLoading] = useState(true);
  // State to hold any error messages
  const [error, setError] = useState(null);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an async function to fetch the country data
    const fetchCountries = async () => {
      try {
        // Set loading to true before the fetch begins
        setLoading(true);
        // Clear any previous errors
        setError(null);

        // Fetch data from the specified API endpoint
        const response = await fetch(
          "https://xcountries-backend.azurewebsites.net/all"
        );

        // Check if the response is not ok (e.g., 404, 500 status codes)
        if (!response.ok) {
          // Throw an error with the response status text
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();
        // Update the countries state with the fetched data
        setCountries(data);
      } catch (e) {
        // Log the error to the console as requested
        console.error("Error fetching data: ", e);
        // Set the error state for display in the UI
        setError("Failed to fetch countries. Please try again later.");
      } finally {
        // Set loading to false once the fetch is complete, regardless of success or failure
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchCountries();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  // Function to render the list of countries
  const renderCountries = () => {
    // Show a loading message while data is being fetched
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      );
    }

    // Show an error message if there was an error
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          <p className="text-lg font-medium">{error}</p>
        </div>
      );
    }

    // Check if countries data is empty and display a message if so
    if (countries.length === 0) {
      return (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p className="text-lg font-medium">No countries found.</p>
        </div>
      );
    }

    // Render the countries in a responsive grid
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 md:p-8">
        {countries.map((country, index) => (
          <div
            key={index} // Using index as a fallback key; a unique ID would be better if available
            className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            {/* Country flag image */}
            <img
              src={country.flag}
              alt={`${country.name} flag`} // Using the country name for the alt text
              className="w-full h-auto rounded-lg mb-2 object-cover aspect-[4/3] border border-gray-100"
            />
            {/* Country name */}
            <h2 className="text-center font-semibold text-sm md:text-base text-gray-800 mt-2">
              {country.name}
            </h2>
          </div>
        ))}
      </div>
    );
  };

  // The main component render method
  return (
    <div className="font-sans bg-gray-100 min-h-screen">
      {/* Header section */}
      <header className="bg-white shadow-md p-4 sm:p-6 mb-4 md:mb-8 text-center sticky top-0 z-10">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
          Country Flags
        </h1>
      </header>

      {/* Main content area with a scrollable list */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {renderCountries()}
      </main>
    </div>
  );
}
