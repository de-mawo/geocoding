import HotToast from "./components/HotToast";
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
      <body className="bg-slate-200">
        <HotToast />
        {children}
      </body>
    </html>
  );
}
