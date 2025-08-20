const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = import.meta.env.VITE_STRAVA_CLIENT_SECRET;
const STRAVA_REDIRECT_URI = import.meta.env.VITE_STRAVA_REDIRECT_URI;

const STRAVA_AUTH_URL = 'https://www.strava.com/oauth/authorize';
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token';

const TOKEN_KEY = 'strava_tokens';

export const initiateLogin = () => {
    const params = new URLSearchParams({
        client_id: STRAVA_CLIENT_ID,
        redirect_uri: STRAVA_REDIRECT_URI,
        response_type: 'code',
        scope: 'read,activity:read_all,profile:read_all',
        approval_prompt: 'force'
    });

    window.location.href = `${STRAVA_AUTH_URL}?${params.toString()}`;
}

export const exchangeCodeForTokens = async (code) => {
    const response = await fetch(STRAVA_TOKEN_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        code,
        grant_type: 'authorization_code',
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to exchange authorization code for tokens');
    }

    const tokens = await response.json();
    saveTokens(tokens);
    return tokens;
}

export const refreshTokens = async (refreshToken) => {
    const response = await fetch(STRAVA_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh tokens');
    }

    const tokens = await response.json();
    saveTokens(tokens);
    return tokens;
}

export const saveTokens = (tokens) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}

export const getTokens = () => {
    const stored = localStorage.getItem(TOKEN_KEY);
    return stored ? JSON.parse(stored) : null;
}

export const getValidAccessToken = async () => {
    const tokens = getTokens();
    if (!tokens) return null;

    const now = Date.now() / 1000;
    if (tokens.expires_at > now + 300) {
        return tokens.access_token;
    }

    try {
        const refreshedTokens = await refreshTokens(tokens.refresh_token);
        return refreshedTokens.access_token;
    } catch (error) {
        console.error('Failed to refresh tokens:', error);
        clearTokens();
        return null;
    }
}

export const clearTokens = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isAuthenticated = () => {
    return getTokens() !== null;
}

export const authLogout = () => {
    clearTokens();
    window.location.reload();
}
