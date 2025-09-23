import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { authAPI } from "@/app/lib/api/client";
import { email } from "zod";

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
          console.log('Received credentials:', credentials);
          
          // Step 1: OTP exists → verify it
          if (credentials.otp) {
            const response = await authAPI.verifyOtp(
              credentials.username,
              credentials.otp

            );

            console.log('OTP verification response:', response);

            if (response.accessToken) {
              return {
                id: response.id || credentials.username,
                name: response.fullName || credentials.username,
                email: response.email || `${credentials.username}@gmail.com`,
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                role: response.role, // From OTP verification response
                fullName:response.fullName,
                tenantId: response.tenantId,
                requiresOtp: response.requiresOtp || false, // ✅ Get from response
                otpVerified: response.otpVerified || true   // ✅ Get from response
              };
            }
            return null;
          }

          // Step 2: No OTP → normal login, backend will send OTP
          const response = await authAPI.login({
            UsernameOrEmail: credentials.username,
            Password: credentials.password,
          });

          console.log('Login response:', response);

          return {
            id: credentials.username,
            name: credentials.username,
            email: response.email || `${credentials.username}@gmail.com`,
            role: response.role || null, // ✅ Role might be null initially
            fullName:response.fullName,
            requiresOtp: response.requiresOtp || true,  // ✅ Get from response
            otpVerified: response.otpVerified || false  // ✅ Get from response
          };
          
        } catch (err) {
          console.error("Auth API error:", err);
          return null;
        }
      }
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
        token.fullName = user.fullName
        token.tenantId = user.tenantId;
        token.requiresOtp = user.requiresOtp !== undefined ? user.requiresOtp : false;
        token.otpVerified = user.otpVerified !== undefined ? user.otpVerified : false;
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
        session.user.fullName = token.fullName
        session.user.tenantId = token.tenantId;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.requiresOtp = token.requiresOtp !== undefined ? token.requiresOtp : false;
        session.otpVerified = token.otpVerified !== undefined ? token.otpVerified : false;
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