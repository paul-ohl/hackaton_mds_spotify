import { NextApiResponse } from 'next';
import { SerializeOptions, serialize } from 'cookie';
import * as Iron from '@hapi/iron';

interface UserSession {
    user: {
        id: string;
        display_name: string;
        email: string;
        images: {
            width: number;
            height: number;
            url: string;
        }[];
    };
    token: {
        access_token: string;
        token_type: string;
        expires_in: number;
        refresh_token: string;
        scope: string;
    };
}

const SESSION_SECRET = process.env.SESSION_SECRET || 'your_secret'; // Ensure you have a valid session secret

export const setAuthCookie = async (
    res: NextApiResponse,
    session: UserSession,
    options: SerializeOptions = {}
) => {
    const defaults: SerializeOptions = {
        maxAge: 3600 * 1000 * 5, // Default maxAge of 5 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Ensure `secure` is only true in production
        sameSite: 'strict',
        path: '/',
    };

    const opts: SerializeOptions = { ...defaults, ...options };

    try {
        // Encrypt the session object using Iron
        const signedSession = await Iron.seal(session, SESSION_SECRET, Iron.defaults);

        // Convert the session object to a string
        const stringValue =
            typeof signedSession === 'object' ? 'j:' + JSON.stringify(signedSession) : String(signedSession);

        // If maxAge is defined, calculate the expiration date
        if ('maxAge' in opts && opts.maxAge) {
            opts.expires = new Date(Date.now() + opts.maxAge); // Set expiration date based on maxAge
            opts.maxAge /= 1000; // Convert maxAge to seconds for the cookie
        }

        // Set the cookie header in the response
        res.setHeader('Set-Cookie', serialize('auth.session', stringValue, opts));
    } catch (error) {
        console.error('Failed to seal session object', error);
        return;
    }
};
