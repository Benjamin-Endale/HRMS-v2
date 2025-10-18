// app/layout.js
import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientWrapper from './ClientWrapper';
import LoginPage from './Components/LoginPage';
import { auth } from '@/app/auth';

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata = {
  title: "HRMS",
  description: "Human resource management system",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="antialiased overflow-y-auto scrollBarDash">
          {/* <ClientWrapper session={session}>
              {children}
              <div id="addModal"></div>
          </ClientWrapper> */}
        {!session ? (
          <LoginPage />
        ) : (
          <ClientWrapper session={session}>
            {children}
            <div id="addModal"></div>
          </ClientWrapper>
        )}
      </body>
    </html>
  );
}

