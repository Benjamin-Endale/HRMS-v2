// app/layout.jsx
import { Urbanist } from "next/font/google";
import "./globals.css";
import { auth } from '@/app/auth'; // Import your auth config
import LoginPage from "./Components/LoginPage"; // Import LoginPage
import ClientWrapper from './ClientWrapper'; // Import ClientWrapper

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata = {
  title: "HRMS",
  description: "Human resource managment system",
};

// Make the layout async to get the session
export default async function RootLayout({ children }) {
  const session = await auth(); // Get session on the server
  console.log("Layout Session:", session);
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="antialiased overflow-y-auto scrollBarDash bg-no-repeat bg-center bg-cover bg-[url(/image/backdash.png)]">
        {/* If user is NOT logged in, show the LoginPage */}
        {!session ? (
          <LoginPage />
        ) : (
          // If user IS logged in, show the main app wrapper
          <ClientWrapper session={session}>
            {children}
            <div id="addModal"></div>
          </ClientWrapper>
        )}
      </body>
    </html>
  );
}