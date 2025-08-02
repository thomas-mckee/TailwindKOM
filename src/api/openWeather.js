const OPENWEATHER_BASE_URL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
    
export const fetchWeather = async (city) => {
    try {
        const endpoint = `${OPENWEATHER_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`;
        const res = await fetch(endpoint);

        if(!res.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await res.json();

        if (data.cod == '400' || data.cod == '404') {
            throw new Error(data.message || 'Invalid city or request')
        }

        return data

    } catch (e) {
        console.error(`Error fetching weather: ${e}`);
        throw e
    } 
}