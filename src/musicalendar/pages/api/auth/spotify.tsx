import { NextApiRequest, NextApiResponse } from 'next';
import querystring from 'querystring';

const { CLIENT_ID, REDIRECT_URI } = process.env;

const scopes = ['user-read-private', 'user-read-email']; // Add other scopes as needed
const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: scopes.join(' '),
})}`;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!CLIENT_ID || !REDIRECT_URI) {
        console.error('Missing CLIENT_ID or REDIRECT_URI in environment variables.');
        return res.status(500).json({ error: 'Server configuration error' });
    }
    try {
        console.log('Redirecting to Spotify login...');
        res.redirect(spotifyAuthUrl);
    } catch (error) {
        console.error('Error redirecting to Spotify:', error);
        res.status(500).json({ error: 'Failed to redirect to Spotify login' });
    }
}
