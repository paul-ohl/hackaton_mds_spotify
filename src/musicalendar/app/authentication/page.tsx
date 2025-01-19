"use client"

import { signIn, signOut, useSession } from "next-auth/react";

export default function Authentication() {
    const { data: session } = useSession();

    if (!session) {
        return (
            <div>
                <h1>You are not signed in</h1>
                <button onClick={() => signIn("spotify")}>Sign in with Spotify</button>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome, {session.user?.name}</h1>
            <p>Access Token: {session.user?.accessToken}</p>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    );
}
