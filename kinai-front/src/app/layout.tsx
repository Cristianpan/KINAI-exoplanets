import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { baseTheme } from "@/theme";
import { CssBaseline } from "@mui/material";
import { Navbar } from "@/components/ui";
import "./globals.css";

const roboto = Roboto({
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Cosmos Explorer",
  description: "An app to explore the cosmos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${roboto.variable}`}>
        <AppRouterCacheProvider>
          <CssBaseline/>
          <ThemeProvider theme={baseTheme}>
            <Navbar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
