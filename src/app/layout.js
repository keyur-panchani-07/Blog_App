import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Blogging App",
  description: "Write your blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit} antialiased`}>
        {/* <SmoothScroll /> */}
        {children}
      </body>
    </html>
  );
}
