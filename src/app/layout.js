import "./globals.css";
import Layout from '../components/Layout/Layout'; // Updated import

export const metadata = {
  title: "Hospital Management System",
  description: "Manage hospital operations efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout> {/* Use the new Layout component */}
      </body>
    </html>
  );
}
