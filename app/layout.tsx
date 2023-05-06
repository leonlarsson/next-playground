import { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import "../public/fontawesome/css/fontawesome.min.css";
import "../public/fontawesome/css/solid.min.css";
import "../public/fontawesome/css/brands.min.css";

const pageTitle = "Leon San José Larsson";
const pageDescription = "Landing page for Leon San José Larsson. Includes links to CV and projects.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  icons: "/favicon.ico",
  themeColor: "#cdacff",
  metadataBase: new URL("https://leonlarsson.com"),
  openGraph: {
    type: "website",
    url: "https://leonlarsson.com",
    title: pageTitle,
    description: pageDescription
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@mozzyfx"
  }
};

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-bl from-white to-slate-200 select-none`}>
        <div className="flex h-[100svh] p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
