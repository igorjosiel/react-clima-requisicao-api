import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import useLocalWeather from "./hooks/useLocalWeather";
import "./App.css";

function App() {
  const { weatherData, forecast, loading, setCity } = useLocalWeather();

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
