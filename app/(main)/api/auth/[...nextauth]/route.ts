import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_ID as string,
      clientSecret: process.env.DISCORD_SECRET as string
      // Disabled to use default scopes due to the addition of extra features for emails
      // authorization: { params: { scope: "identify" } }
    })
  ],
  callbacks: {
    // Make sure email and name are available. Disabled for now
    // signIn: ({ user }) => !!(user.email && user.name)
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
