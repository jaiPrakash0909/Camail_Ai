import { corsair } from "@/lib/corsair";

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({

  //**** */
//   events: {
//   async linkAccount({ user, account }) {

//     console.log("========== LINK ACCOUNT ==========");
//     console.log("USER ID:", user.id);
//     console.log("PROVIDER:", account.provider);

//     if (account.provider !== "google") return;

//     await corsair.keys.gmail.set_client_id(
//       process.env.GOOGLE_CLIENT_ID!
//     );

//     await corsair.keys.gmail.set_client_secret(
//       process.env.GOOGLE_CLIENT_SECRET!
//     );

//     await corsair.keys.googlecalendar.set_client_id(
//       process.env.GOOGLE_CLIENT_ID!
//     );

//     await corsair.keys.googlecalendar.set_client_secret(
//       process.env.GOOGLE_CLIENT_SECRET!
//     );

//     if (account.access_token) {
//       await corsair
//         .withTenant(user.id)
//         .gmail
//         .keys
//         .set_access_token(account.access_token);

//       await corsair
//         .withTenant(user.id)
//         .googlecalendar
//         .keys
//         .set_access_token(account.access_token);
//     }

//     if (account.refresh_token) {
//       await corsair
//         .withTenant(user.id)
//         .gmail
//         .keys
//         .set_refresh_token(account.refresh_token);

//       await corsair
//         .withTenant(user.id)
//         .googlecalendar
//         .keys
//         .set_refresh_token(account.refresh_token);
//     }
//   }
// },
//***** */
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database"
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/calendar"
          // scope: "openid email profile"
        }
      }
    })
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  }
});
