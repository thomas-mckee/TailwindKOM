import { useEffect, useState } from 'react';
import { Wind, RefreshCw, LogOut, User } from 'lucide-react';

import { useAuth } from './hooks/useAuth';
import { useSegmentsWithWeather } from './hooks/useSegmentsWithWeather';

import { getStarredSegments } from './services/strava';
import { getCurrentLocationWeather } from './services/weather';
import { mockSegments } from './data/mockSegments';

import { SegmentCard } from './components/SegmentCard';
import { WeatherDisplay } from './components/WeatherDisplay';
import { InspirationalQuote } from './components/InspirationalQuote';

function App() {
	const { isAuthenticated, loading: authLoading, login, logout, handleAuthCallback, tokens } = useAuth();
	const { segments, loading: segmentsLoading, error, fetchSegmentsWithWeather, refetch } = useSegmentsWithWeather(); 
	const [currentWeather, setCurrentWeather] = useState(null);
	const [weatherLoading, setWeatherLoading] = useState(false);
	
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		const error = urlParams.get('error');

		if (error) {
			console.error('OAuth error:', error);
			window.history.replaceState({}, document.title, '/');
			return;
		}

		if (code && !isAuthenticated) {
			handleAuthCallback(code).catch(console.error);
		}
  	}, [isAuthenticated, handleAuthCallback]);

	useEffect(() => {
		if (isAuthenticated) {
			fetchSegmentsWithWeather();
			loadCurrentWeather();
		}
  	}, [isAuthenticated]);

	const loadCurrentWeather = async () => {
    try {
      setWeatherLoading(true);
      const weather = await getCurrentLocationWeather();
      setCurrentWeather(weather);
    } catch (error) {
      console.error('Failed to load current weather:', error);
    } finally {
      setWeatherLoading(false);
    }
  };

	const handleRefresh = () => {
    refetch();
    loadCurrentWeather();
  };

	if (authLoading) {
		return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="text-center">
			<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
			<p className="text-gray-600">Loading...</p>
			</div>
		</div>
		);
	}

	if (!isAuthenticated) {
		return (
		<div className="min-h-screen bg-gray-50 flex items-center justify-center">
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full mx-4">
			<div className="text-center">
				<div className="flex items-center justify-center mb-6">
				<Wind className="h-12 w-12 text-orange-600 mr-2" />
				<h1 className="text-3xl font-bold text-gray-900">TailwindKOM</h1>
				</div>
				<p className="text-gray-600 mb-6">
				Find the best wind conditions for your starred Strava segments
				</p>
				<button
				onClick={login}
				className="w-full bg-orange-600 hover:bg-orange-700 hover:cursor-pointer text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
				>
				<span>Connect with Strava</span>
				</button>
				<p className="text-sm text-gray-500 mt-4">
				We'll analyze your starred segments and show you which ones have the best wind conditions right now.
				</p>
			</div>
			</div>
		</div>
		);
	}


	return (
		<div className='min-h-screen bg-gray-50'>
			<header className='bg-gradient-to-r from-orange-200 to-blue-200 shadow-sm border-b border-orange-200'>
				<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
					<div className="flex items-center justify-between h-20">
						<a href='' className='flex items-center space-x-2 sm:space-x-3'>
							<Wind className='h-10 w-10 text-orange-500' />
							<h1 className='text-2xl font-bold text-gray-900'>TailwindKOM</h1>
						</a>
						<div className="flex items-center space-x-1 sm:space-x-4">
							{tokens?.athlete && (
								<div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
									<User className="h-4 w-4" />
									<span className="truncate max-w-24 lg:max-w-none">{tokens.athlete.firstname} {tokens.athlete.lastname}</span>
								</div>
							)}
							<button
								onClick={handleRefresh}
								disabled={segmentsLoading || weatherLoading}
								className='flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-600 cursor-pointer hover:text-gray-900 rounded-md hover:bg-gray-100 transition duration-200 disabled:opacity-50'
							>
								<RefreshCw className={`h-6 w-6 ${(segmentsLoading || weatherLoading) ?
									'animate-spin' : ''}`} />
								<span className="hidden sm:inline">Refresh</span>
							</button>
							<button 
								onClick={logout}
								className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-red-600 cursor-pointer hover:text-red-700 rounded-md hover:bg-red-50 transition duration-200">
								<LogOut className='h-6 w-6' />
								<span className="hidden sm:inline">Logout</span>
							</button>
						</div>
					</div>
				</div>
			</header>
			
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<InspirationalQuote />
				<WeatherDisplay weather={currentWeather} loading={weatherLoading} />

				<div>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-xl font-semibold text-gray-900">
							Your Starred Segments ({segments.length})
						</h2>
						<p className="text-sm text-gray-600">
							Sorted by wind score (best conditions first)
						</p>
					</div>		
					<div className="space-y-4">
						{segments.map((segment) => (
							<SegmentCard key={segment.id} segment={segment} />
						))}
					</div>
				</div>
			</main>
		</div>
			
			
	)
}

export default App
