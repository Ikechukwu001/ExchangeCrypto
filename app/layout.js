import "./globals.css";
import { Toaster } from "react-hot-toast";  // ✅ fixed

export const metadata = {
  title: "FastExchange – Exchange Crypto Fast, Securely & Globally",
  description:
    "FastExchange is your trusted crypto platform to buy, sell, and exchange digital currencies securely and instantly across the world.",
  keywords: [
    "crypto exchange",
    "bitcoin",
    "ethereum",
    "NGN to USD",
    "crypto trading",
    "FastExchange",
    "buy crypto Nigeria",
  ],
  authors: [{ name: "FastExchange Team" }],
  creator: "IkechukwuFrontEnd",
  publisher: "FastExchange Inc.",
  metadataBase: new URL("https://exchange-crypto1.vercel.app/"),
  alternates: {
    canonical: "https://exchange-crypto1.vercel.app/",
  },
  openGraph: {
    title: "FastExchange – Exchange Crypto Fast, Securely & Globally",
    description:
      "Buy, sell, and trade crypto instantly with FastExchange. Secure, fast, and global transactions.",
    url: "https://exchange-crypto1.vercel.app/",
    siteName: "FastExchange",
    images: [
      {
        url: "https://fastexchange.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "FastExchange Crypto Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastExchange – Exchange Crypto Fast, Securely & Globally",
    description:
      "Instant crypto trading and global exchange with FastExchange.",
    creator: "@fastexchange",
    images: ["https://fastexchange.com/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
      </head>
      <body>
        {children}
        <Toaster position="top-right" reverseOrder={false} />  {/* ✅ works correctly now */}
      </body>
    </html>
  );
}
