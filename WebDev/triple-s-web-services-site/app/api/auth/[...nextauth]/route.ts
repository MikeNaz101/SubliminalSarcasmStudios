import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Commander Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Check if the user inputted anything
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                // Add this line to debug what AWS actually sees:
                console.log("DEBUG ENV EMAIL:", process.env.ADMIN_EMAIL);
                console.log("DEBUG ENV PASS:", process.env.ADMIN_PASSWORD);

                // 2. Compare inputs strictly against your .env variables
                if (
                    credentials.email === process.env.ADMIN_EMAIL &&
                    credentials.password === process.env.ADMIN_PASSWORD
                ) {
                    // Success: Return the user object
                    return { id: "1", name: "Commander", email: credentials.email };
                }

                // Failure: Reject the login
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 86400, // The session expires in 24 hours
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        // If you build a custom login page later, you put the path here.
        // Otherwise, NextAuth generates a secure default login screen.
        // signIn: '/admin/login',
    }
});

export { handler as GET, handler as POST };