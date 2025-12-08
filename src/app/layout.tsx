// src/app/layout.tsx
import "./index.css";
import Navbar from "../components/nav";

export const metadata = {
  title: "Transport",
  description: "Enhanced UI with Tailwind",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Wrapper */}
        <main className="container mx-auto px-6 py-10 flex-1 animate-fadeIn">
          <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-6 text-center text-sm tracking-wide">
          © 2025 Transport System. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
