import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { TokenSet, Account } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { User } from "next-auth";

export default NextAuth({
  callbacks: {
    async signIn({ user }) {
      return true;
    },
    async session({ session, token }) {
      console.log("session() Invoked");
      session.error = token.error;
      return session;
    },
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: Account | null;
      user: User;
    }): Promise<JWT> {
      console.log("jwt() invoked");

      if (account) {
        return {
          access_token: account.access_token,
          expires_at: Math.floor(Date.now() / 1000 + account.expires_in),
          refresh_token: account.refresh_token,
          name: user.name,
          picture: user.image,
        };
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID as string,
              client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token,
            }),
            method: "POST",
          });
          const tokens: TokenSet = await response.json();

          if (!response.ok || typeof tokens.expires_in !== "number")
            throw tokens;

          return {
            ...token, // Keep the previous token properties
            access_token: tokens.access_token as string,
            expires_at: Math.floor(Date.now() / 1000 + tokens.expires_in),
            // Fall back to old refresh token, but note that
            // many providers may only allow using a refresh token once.
            refresh_token: tokens.refresh_token ?? token.refresh_token,
          };
        } catch (error) {
          console.error("Error refreshing access token", error);
          // The error property will be used client-side to handle the refresh token error
          return { ...token, error: "RefreshAccessTokenError" as const };
        }
      }
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent",
          scope: "https://www.googleapis.com/auth/adwords openid profile email",
        },
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});

declare module "next-auth/core/types" {
  interface Session {
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshAccessTokenError";
  }
}

declare module "next-auth" {
  interface Account {
    access_token: string;
    expires_in: number;
    refresh_token: string;
  }
}
