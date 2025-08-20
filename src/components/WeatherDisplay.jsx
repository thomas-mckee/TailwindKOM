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
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src={getWeatherIconUrl(condition.icon)}
              alt={condition.description}
              className="w-12 h-12"
            />
            <div>
              <h3 className="text-lg font-semibold capitalize">
                {condition.description}
              </h3>
              <p className="text-gray-500 text-sm">Current Location</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-7 w-7 text-orange-500" />
            <span className="text-xl font-semibold">
              {formatTemperature(temperature)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Wind className="h-7 w-7 text-blue-500" />
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-semibold">
                  {formatWindSpeed(windSpeed)}
                </span>
								<div className='flex flex-col'>
									<MoveUp className='h-7 w-7 text-blue-500 flex items-center justify-center mb-1'  style={{ transform: `rotate(${(windDirection + 180)}deg)` }}/>
									<span className="text-xs text-gray-500">
                		{getWindDirectionText(windDirection)}
              		</span>
								</div>
              </div>
              
            </div>
          </div>

          {weather.main.humidity && (
            <div className="flex items-center space-x-2">
              <Cloud className="h-7 w-7 text-gray-500" />
              <div className="text-center">
                <span className="text-xl font-semibold">{weather.main.humidity}%</span>
                <p className="text-xs text-gray-500">Humidity</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}