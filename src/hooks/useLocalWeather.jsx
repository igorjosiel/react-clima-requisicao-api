import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const useLocalWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return { loading, weatherData, forecast, error, setCity };
};

export default useLocalWeather;
