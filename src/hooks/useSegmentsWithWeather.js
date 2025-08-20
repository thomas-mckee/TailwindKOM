import { useState, useEffect } from 'react';
import { getStarredSegments } from '../services/strava';
import { getWeatherByCoordinates } from '../services/weather';
import { calculateWindScore } from '../utils/windScore';
import { mockSegments } from '../data/mockSegments';

export function useSegmentsWithWeather() {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSegmentsWithWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching starred segments...');
      const starredSegments = await getStarredSegments();
      //const starredSegments = mockSegments;
      console.log(`Found ${starredSegments.length} starred segments`);
      
      const segmentsWithWeather = await Promise.all(
        starredSegments.map(async (segment) => {
          try {
            const [startLat, startLng] = segment.start_latlng;
            const weather = await getWeatherByCoordinates(startLat, startLng);
            const windScore = calculateWindScore(segment, weather);

            return {
              ...segment,
              weather,
              windScore,
            };
          } catch (weatherError) {
            console.warn(`Failed to get weather for segment ${segment.id}:`, weatherError);
            return null;
          }
        })
      );

      const validSegments = segmentsWithWeather
        .filter((segment) => segment !== null && segment.windScore.score !== undefined)
        .sort((a, b) => b.windScore.score - a.windScore.score);

      setSegments(validSegments);
      console.log(validSegments);
    } catch (err) {
      console.error('Failed to fetch segments with weather:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    fetchSegmentsWithWeather();
  };

  return {
    segments,
    loading,
    error,
    fetchSegmentsWithWeather,
    refetch,
  };
}