import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import {JWT} from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: process.env.SPOTIFY_AUTH_URL!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account && user) {
                // Initial sign-in
                return {
                    accessToken: account.access_token!,
                    refreshToken: account.refresh_token!,
                    accessTokenExpires: account.expires_at! * 1000, // Expiration in ms
                    user,
                };
            }

            // Return the token if the access token has not expired
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }

            // Access token has expired, try to refresh it
            return await refreshAccessToken(token);
        },
        async session({ session, token }) {
            // Attach token values to the session
            session.user = {
                ...session.user,
                accessToken: token.accessToken as string,
                refreshToken: token.refreshToken as string,
                error: token.error as string | undefined,
            };

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
        const url =
            "https://accounts.spotify.com/api/token?" +
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: token.refreshToken,
            });

        const response = await fetch(url, {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString("base64")}`,
            },
            method: "POST",
        });

        const refreshedTokens = await response.json();

        if (!response.ok) {
            throw refreshedTokens;
        }

        return {
            ...token,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000, // Expiration in ms
            refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
        };
    } catch (error) {
        console.error("Error refreshing access token:", error);

        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
