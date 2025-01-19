import "next-auth";
import "next-auth/jwt";

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
        refreshToken: string;
        accessTokenExpires: number; // Expiry timestamp in ms
        error?: string; // Optional error message
    }
}

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            accessToken?: string;
            refreshToken?: string;
            error?: string;
        };
    }
}
