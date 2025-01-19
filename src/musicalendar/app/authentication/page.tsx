// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const LoginPage = () => {
    const router = useRouter();

    const handleLogin = () => {
        console.log('Login page'); // Debug log
        alert('Button clicked'); // Optional debug alert
        router.push('/api/auth/spotify');
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

export default LoginPage;
