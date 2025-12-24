import "./styles.css";

const WeatherCard = ({ weatherData }) => {
  return (
    <section className="weather-card">
      <p>Hoje {weatherData?.forecast[0]?.date}</p>
      <img
        src={`./icons-weather/${weatherData?.condition_slug}.svg`}
        alt={weatherData?.description}
      />
      <h2 className="temperature">{weatherData?.temp}°</h2>
      <p className="condition">{weatherData?.description}</p>

      <div className="humidity">
        <div>
          <img src="./humidity.svg" alt="" />
          <p>Umidade: </p>
        </div>

        <span>{weatherData?.humidity} %</span>
      </div>

      <div className="min-max">
        <div>
          <img src="./temp.svg" alt="" />
          <p>Min/Max:</p>
        </div>

        <span>{weatherData?.forecast[0]?.min}/{weatherData?.forecast[0]?.max}°</span>
      </div>
    </section>
  );
};

export default WeatherCard;
