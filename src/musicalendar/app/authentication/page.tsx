'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import querystring from 'querystring';

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

const scopes = ['user-read-private', 'user-read-email'];

const AuthenticationPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        if (!clientId || !redirectUri) {
            return console.error('Missing CLIENT_ID or REDIRECT_URI in environment variables.');
        }

        const spotifyAuthUrl = `https://accounts.spotify.com/authorize?${querystring.stringify({
            client_id: clientId,
            response_type: 'code',
            redirect_uri: redirectUri,
            scope: scopes.join(' '),
        })}`;

        // Redirect to Spotify login
        router.push(spotifyAuthUrl);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h1>Login to Spotify</h1>
                <p>Click the button below to log in with your Spotify account.</p>
                <button
                    onClick={handleLogin}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#1db954',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    Login with Spotify
                </button>
            </div>
        </div>
    );
};

export default AuthenticationPage;
