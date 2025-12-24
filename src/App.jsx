import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=Ewbank da Câmara,MG`
        );

        const data = await response.json();

        if (data.results) {
          setWeatherData(data.results);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="app-container">
      <SearchBar />

      {weatherData && (
        <>
          <h1>{weatherData?.city}</h1>
          <WeatherCard weatherData={weatherData} />
        </>
      )}
    </div>
  );
}

export default App;
