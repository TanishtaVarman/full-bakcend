import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CrimeBook | Personal AI Mistake Notebook & Study Companion',
  description:
    'An always-on private study companion powered by NVIDIA Nemotron on Nebius Token Factory. Automatically creates mistake notebooks and adaptive diagnostic tests as you study.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F2] text-[#3B1320] antialiased min-h-screen overflow-hidden">
        {children}
      </body>
    </html>
  );
}
