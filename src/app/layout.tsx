import Header from "@/components/header/Header";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "@/components/footer/Footer";
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin"],
  display: "swap",
});
export const metadata = {
  title: "CryptoKing",
  description: "CryptoKing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <div className="main_body">
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
