import { Wind, Thermometer, Cloud, MoveUp } from 'lucide-react';

export const WeatherDisplay = ({ weather, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <p className="text-center text-gray-600 mt-2">Loading weather data...</p>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-center text-gray-600">Unable to load weather data</p>
      </div>
    );
  }

  const windDirection = weather.wind.deg;
  const windSpeed = weather.wind.speed;
  const temperature = weather.main.temp;
  const condition = weather.weather[0];

  const formatTemperature = (temp) => {
    return `${Math.round(temp)}°C`;
  }

  const formatWindSpeed = (speed) => {
    const kmh = speed * 3.6;
    return `${Math.round(kmh)} km/h`;
  }

  const getWindDirectionText = (degrees) => {
    const directions = [
      'N', 'NNE', 'NE', 'ENE',
      'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW',
      'W', 'WNW', 'NW', 'NNW'
    ];
    
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  const getWeatherIconUrl = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  return (
    <a 
      href={`https://openweathermap.org/city/${weather.id}`}
      target='_blank'
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-md sm:p-6 mb-6 p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-2">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={getWeatherIconUrl(condition.icon)}
              alt={condition.description}
              className="w-10 h-10 sm:w-12 sm:h-12"
            />
            <div>
              <h3 className="text-base sm:text-lg font-semibold capitalize">
                {condition.description}
              </h3>
              <p className="text-gray-500 text-sm">Current Location</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:space-x-6 sm:gap-0">
          <div className="flex items-center justify-center space-x-2 text-center">
            <Thermometer className="h-6 w-6 sm:h-7 sm:w-7 text-orange-500" />
            <span className="text-lg sm:text-xl font-semibold">
              {formatTemperature(temperature)}
            </span>
          </div>

          <div className="flex flex-col items-center space-y-1 text-center pt-6">
            <div className="flex items-center space-x-2">
              <Wind className="h-6 w-6 sm:h-7 sm:w-7 text-blue-500" />
              <span className="text-lg sm:text-xl font-semibold">
                {formatWindSpeed(windSpeed)}
              </span>
            </div>
            <div className='flex items-center space-x-1'>
              <MoveUp className='h-4 w-4 sm:h-5 sm:w-5 text-blue-500' style={{ transform: `rotate(${(windDirection + 180)}deg)` }}/>
              <span className="text-xs text-gray-500">
                {getWindDirectionText(windDirection)}
              </span>
            </div>
          </div>

          {weather.main.humidity && (
            <div className="flex flex-col items-center space-y-1 text-center pt-6">
              <div className="flex items-center space-x-2">
                <Cloud className="h-6 w-6 sm:h-7 sm:w-7 text-gray-500" />
                <div className="text-lg sm:text-xl font-semibold">{weather.main.humidity}%</div>
              </div>
              <p className="text-xs text-gray-500">Humidity</p>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}