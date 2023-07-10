import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  callbacks: {
    async signIn({ user }) {
      console.log("signIn() Invoked");
      return true;
    },
    async session({ session }) {
      console.log("session() Invoked");
      return session;
    },
    async jwt({ token, account }) {
      if (account?.accessToken) {
        console.log("SUCCESS!");
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }
      console.log("jwt() invoked");
      console.log("ACCOUNT: ", account);
      console.log("TOKEN: ", token);
      return token;
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

//https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email
