const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const OPENWEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5`;

export const getWeatherByCoordinates = async (lat, lng) => {
    try {
        const response = await fetch(`${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`Failed to fetch weather for coordinates (${lat}, ${lng}):`, error);
        throw new Error('Failed ot fetch weather data');
    }
}

export const getCurrentLocationWeather = async () => {
    return new Promise((resolve, reject) => {
        if(!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try{
                    const weather = await getWeatherByCoordinates(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    resolve(weather);
                } catch(error) {
                    reject(error);
                }
            },
            (error) => {
                console.error('Geolocation error:', error);
                reject(new Error('Failed to get current location'));
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000,
            }
        );
    });
}


    
