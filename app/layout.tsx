import type { Metadata } from 'next';
import { Inter, Playfair_Display, Cormorant_Garamond, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-accent',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'GunjanHolidays - Explore the World with Us',
  description: 'GunjanHolidays offers premium tour packages to Bali, Dubai, Maldives, Switzerland, Goa, Thailand and more. Book your dream vacation today.',
  keywords: 'travel agency, tour packages, holiday packages, international tours, domestic tours, Bali, Dubai, Maldives',
  icons: {
    icon: '/images/logo.svg',
  },
  openGraph: {
    title: 'GunjanHolidays - Explore the World with Us',
    description: 'Premium travel packages for unforgettable journeys around the world.',
    images: [
      {
        url: 'https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg',
        width: 1200,
        height: 630,
        alt: 'GunjanHolidays - Explore the World with Us',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
