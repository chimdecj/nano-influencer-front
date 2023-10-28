import { API_URL, signIn } from "@/api";
import axios from "axios";
import type { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { stderr } from "process";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
    // error: "/auth/myerror",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    CredentialProvider({
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", "test1");
        urlencoded.append("password", "test");
        try {
          let config = {
            method: "post",
            url: "https://8128i5qus3.execute-api.eu-central-1.amazonaws.com/v1/cognito/admin/users/sign-in",
            origin: "http://localhost:3000",
            headers: {
              // "Content-Type": "application/x-www-form-urlencoded",
              "Content-Type": "application/json",
            },
            data: credentials,
          };
          await axios
            .request(config)
            .then((response) => {
              process.stdout.write(JSON.stringify(response.config));
              process.stdout.write(JSON.stringify(response.data));
            })
            .catch((error) => {
              process.stdout.write(error);
            });

          // const res = await fetch("https://sagexer.com/login", {
          //   method: "POST",
          //   body: urlencoded,
          //   headers: { "Content-type": "application/x-www-form-urlencoded" },
          // });
          return null;
          // process.stdout.write(`RES ${JSON.stringify(res.config)}\n${JSON.stringify(res.data)}`);
          // return res.data;
        } catch (e: any) {
          process.stdout.write(`Error ${JSON.stringify(e)}\n`);
        }

        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user;
        // }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: "234325869345899" as string,
      clientSecret: "0793e94d6d953783aa83c495aec3083f" as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          response_mode: "",
        },
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          // token: token,
          // session: session,
          id: token.id,
          // randomKey: token.randomKey,
          // accessToken: token.accessToken,
        },
      };
    },
    // jwt: ({ token, user }) => {
    //   if (user) {
    //     const u = user as unknown as any;
    //     return {
    //       ...token,
    //       id: u.id,
    //       randomKey: u.randomKey,
    //     };
    //   }
    //   return token;
    // },
  },
};
