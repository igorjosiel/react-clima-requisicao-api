import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    async function fetchByCoordinates(lat, lon) {
      try {
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();

        if (data.results) {
          setWeatherData(data.results);
          setForecast(data.results.forecast.slice(1, 4));
        } else {
          setError("Não foi possível obter os dados do clima.");
        }
      } catch (err) {
        setError("Erro ao buscar dados do clima." + err);
      } finally {
        setLoading(false);
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          fetchByCoordinates(latitude, longitude);
        },
        (err) => {
          setError("Permissão de localização negada." + err);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocalização não suportada pelo navegador.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    
    async function fetchWeather() {
      try {
        const response = await fetch(
          `https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`
        );
        const data = await response.json();

        if (data.results) {
          setWeatherData(data.results);
          setForecast(data.results.forecast.slice(1, 4));
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API", error);
      } finally {
        setLoading(false);
      }
    }

    if (city) fetchWeather();
  }, [city]);

  return (
    <div className="app-container">
      <SearchBar onSearch={setCity} />

      {loading ? (
        <Loading />
      ) : weatherData ? (
        <>
          <h1>
            {weatherData.city}

            <span>
              Nascer do Sol: {weatherData.sunrise} | Pôr do Sol:{" "}
              {weatherData.sunset}
            </span>
          </h1>

          <WeatherCard weatherData={weatherData} />
          <ForecastList forecasts={forecast} />
        </>
      ) : (
        <p>Digite uma cidade para buscar o clima.</p>
      )}
    </div>
  );
}

export default App;
