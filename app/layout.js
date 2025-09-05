import { Urbanist } from "next/font/google";
import "./globals.css";
import ClientWrapper from './ClientWrapper'

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata = {
  title: "HRMS",
  description: "Human resource managment system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className=" antialiased overflow-y-auto scrollBarDash bg-no-repeat bg-center bg-cover bg-[url(/image/backdash.png)]">
        <ClientWrapper>
          {children}
          <div id="addModal"></div>
        </ClientWrapper>
      </body>
    </html>
  );
}