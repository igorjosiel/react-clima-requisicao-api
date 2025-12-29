import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=São Paulo, SP`
        );
        const data = await response.json();

        if (data.results) {
          setWeatherData(data.results);
          setForecast(data.results.forecast.slice(1, 4));
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      }
    }

    fetchWeather();
  }, []);

  const renderCityName = (city) => {
    if (!city) return "";

    return city.replace(",", " -");
  };

  return (
    <div className="app-container">
      <SearchBar />

      {weatherData && (
        <>
          <h1>{renderCityName(weatherData?.city)}</h1>

          <WeatherCard weatherData={weatherData} />
          <ForecastList forecasts={forecast} />
        </>
      )}
    </div>
  );
}

export default App;
