import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
    // 1. Extend the built-in Session type
    interface Session {
        user: {
            id: string;
            roles: string[];   // Our new array
            role?: string;     // Kept for backward compatibility
        } & DefaultSession["user"];
    }

    // 2. Extend the built-in User type
    interface User extends DefaultUser {
        id: string;
        roles: string[];
        role?: string;
    }
}

declare module "next-auth/jwt" {
    // 3. Extend the built-in JWT type
    interface JWT extends DefaultJWT {
        id: string;
        roles: string[];
        role?: string;
    }
}