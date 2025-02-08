import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

export const metadata = {
  title: "Geo Coding",
  description: "Mapbox react places autocomplete",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
