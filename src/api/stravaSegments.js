const STRAVA_BASE_URL = `https://www.strava.com/api/v3/segments/starred`;
const API_KEY = import.meta.env.VITE_STRAVA_API_KEY;

const perPage = 50;

export const fetchSegments = async () => {
    try {
        const endpoint = `${STRAVA_BASE_URL}?per_page=${perPage}`
        const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        })

        const data = await res.json();

        return data;

    } catch (e) {
        console.error(`Error fetching segments: ${e}`);
        throw e
    }
}