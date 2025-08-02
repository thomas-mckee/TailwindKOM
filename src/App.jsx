import { useEffect, useState } from 'react';
import { fetchWeather } from './api/openWeather';
import { fetchSegments } from './api/stravaSegments';
import { attatchWindInfo } from './lib/attatchWindInfo';
import SegmentList from './components/SegmentList';
import WeatherDisplay from './components/WeatherDisplay';

import './App.css';

function App() {
	const [weatherData, setWeatherData] = useState(null);
	const [city, setCity] = useState('Winnipeg');
	const [errorMessage, setErrorMessage] = useState('');
	const [segments, setSegments] = useState([]);
	

	useEffect(() => {
		const loadWeather = async () => {
			try {
				const data = await fetchWeather(city);
				console.log(data);
				setWeatherData(data);
				setErrorMessage('');
			} catch (e) {
				setWeatherData(null);
				setErrorMessage(e.message || 'Error fetching weather.');
			}
		};

		loadWeather();
	}, [city]);

	useEffect(() => {
		const loadSegments = async () => {
			try {
				if (!weatherData?.wind?.deg) return; // Wait for wind data

				const rawSegments  = await fetchSegments();
				const windSegments = attatchWindInfo(rawSegments, weatherData.wind.deg);
				
				console.log(windSegments);

				setSegments(windSegments);
				setErrorMessage('');
			} catch (e) {
				setSegments([]);
				setErrorMessage(e.message || 'Error fetching segments.');
			}
		};

		loadSegments();
	}, [weatherData]);

	return (
		<>

			<h1 className='font-bold text-orange-600'>TailwindKOM</h1>
			{errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

			{weatherData && <WeatherDisplay weatherData={weatherData} />}
			
			<SegmentList segments={segments} />

		</>
	)
}

export default App
