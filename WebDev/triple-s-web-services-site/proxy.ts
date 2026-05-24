import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            // If a token exists, they are logged in. If not, boot them out.
            return !!token;
        },
    },
});

// This matcher strictly defines which routes are locked down
export const config = {
    matcher: [
        // This locks the commander dashboard and any sub-pages you build inside it
        "/admin/commander/:path*",
    ],
};