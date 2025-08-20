import { getValidAccessToken } from "../services/auth";

const STRAVA_BASE_URL = `https://www.strava.com/api/v3`;

const perPage = 50;

const getAuthHeaders = async () => {
    const accessToken = await getValidAccessToken();
    if (!accessToken) {
        throw new Error('No valid access token available');
    }
    return {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
}


export const getStarredSegments = async () => {
    try {
        console.log('Getting auth headers...');
        const authHeaders = await getAuthHeaders();
        console.log('Making request to Strava API...');
        
        const response = await fetch(`${STRAVA_BASE_URL}/segments/starred`, {
            method: 'GET',
            headers: authHeaders,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Strava API response:', response.status, data?.length || 0, 'segments');
        
        return data;

    } catch (error) {
        console.error(`Error fetching segments: ${error}`);
        throw error
    }
}
