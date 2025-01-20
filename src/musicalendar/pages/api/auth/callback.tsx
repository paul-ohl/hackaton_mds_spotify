import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import querystring from 'querystring';
import { setAuthCookie } from '@/app/utils/cookies'; // Import the setAuthCookie function

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;
const clientSecret = process.env.CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    try {
        // Step 1: Exchange the code for an access token
        const tokenResponse = await axios.post(
            'https://accounts.spotify.com/api/token',
            querystring.stringify({
                grant_type: 'authorization_code',
                code: code as string,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );

        // Step 2: Handle the token (store it in a cookie)
        const { access_token, refresh_token, expires_in, scope, token_type } = tokenResponse.data;

        const userResponse = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${access_token}`, // Add the access token to the Authorization header
            },
        });

        const { id, display_name, email, images } = userResponse.data;

        const userSession = {
            user: {
                id,
                display_name,
                email,
                images: images || [], // Fallback in case images array is empty
            },
            token: {
                access_token,
                refresh_token,
                expires_in,
                scope,
                token_type
            },
        };

        // Set the session as a cookie
        await setAuthCookie(res, userSession); // Set the session as cookie

        // Redirect user to a profile page or a dashboard
        res.redirect('/calendar');
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Failed to authenticate with Spotify' });
    }
}
