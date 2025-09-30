import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authAPI } from "@/app/lib/api/client";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
          console.log("Received credentials:", credentials);

          if (credentials.otp) {
            const response = await authAPI.verifyOtp(
              credentials.username,
              credentials.otp,
            );

            console.log("OTP verification response:", response);

            if (response.accessToken) {
              return {
                id: response.id, // ✅ always use backend id
                name: response.fullName || response.username || credentials.username,
                email: response.email || `${credentials.username}@gmail.com`,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                role: response.role,
                fullName: response.fullName,
                tenantId: response.tenantId,
                lastLoginUtc: response.lastLoginUtc || null, 
                requiresOtp: response.requiresOtp || false,
                otpVerified: response.otpVerified || true,
              };
            }
            return null;
          }

          const response = await authAPI.login({
            UsernameOrEmail: credentials.username,
            Password: credentials.password,
          });

          console.log("Login response:", response);

          return {
            id: response.id, 
            name: response.fullName || response.username || credentials.username,
            email: response.email || `${credentials.username}@gmail.com`,
            role: response.role || null,
            fullName: response.fullName,
            tenantId: response.tenantId,
            lastLoginUtc: response.lastLoginUtc || null, 
            requiresOtp: response.requiresOtp ?? true,
            otpVerified: response.otpVerified ?? false,
          };
        } catch (err) {
          console.error("Auth API error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial login - set user data
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.role = user.role;
        token.fullName = user.fullName;
        token.tenantId = user.tenantId;
        token.lastLoginUtc = user.lastLoginUtc || null;
        token.requiresOtp =
          user.requiresOtp !== undefined ? user.requiresOtp : false;
        token.otpVerified =
          user.otpVerified !== undefined ? user.otpVerified : false;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        if (session.otpVerified !== undefined) {
          token.otpVerified = session.otpVerified;
          token.requiresOtp = false;
        }
        if (session.role) {
          token.role = session.role;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.fullName = token.fullName;
        session.user.tenantId = token.tenantId;
        session.user.lastLoginUtc = token.lastLoginUtc || null;  
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.requiresOtp =
          token.requiresOtp !== undefined ? token.requiresOtp : false;
        session.otpVerified =
          token.otpVerified !== undefined ? token.otpVerified : false;
      }
      return session;
    },
  },

  pages: {
    signIn: "/Login",
    error: "/Login?error=AuthenticationFailed",
  },

  session: { strategy: "jwt" },
});
