import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- ESSA LINHA É A QUE FAZ A MÁGICA

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AVFS - Avaliador de Mídia",
  description: "Seu catálogo pessoal de filmes e animes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}