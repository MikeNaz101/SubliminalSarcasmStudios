import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise) as Adapter,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    // 1. New users default to an array
                    roles: ["unverified"],
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                // 2. Backward Compatibility:
                // If they have the new 'roles' array, use it.
                // If they have the old 'role' string, wrap it in an array.
                token.roles = user.roles || (user.role ? [user.role] : ["unverified"]);
                token.id = user.id;
            }
            if (trigger === "update" && session?.roles) {
                token.roles = session.roles;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                // 3. Pass the array to the active session
                session.user.roles = (token.roles as string[]) || [];
                session.user.id = token.id as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },

    pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };