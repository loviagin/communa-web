import { Nunito } from "next/font/google";
import "../../globals.css";
import Header from "@/app/components/Header/Header";

const nunito = Nunito({
  subsets: ["latin"],
  weights: [400, 700],
});

export const metadata = {
  title: "Communa",
  description: "Social platform for chatting and sharing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${nunito.className}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
