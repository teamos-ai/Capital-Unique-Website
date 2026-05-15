import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata = {
  metadataBase: new URL("https://capital-unique-website.vercel.app"),
  title: {
    default: "Capital Unique — Capital Intelligently Applied",
    template: "%s · Capital Unique",
  },
  description:
    "Australian non-bank lending and capital advisory for complex scenarios where traditional finance falls short.",
  openGraph: {
    title: "Capital Unique — Capital Intelligently Applied",
    description:
      "Non-bank lending for complex scenarios. Fast assessment on deals others decline.",
    type: "website",
    siteName: "Capital Unique",
  },
};

// Set the theme class before first paint so there's no flash.
// Default is dark; an explicit stored choice overrides it.
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('cu-theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
