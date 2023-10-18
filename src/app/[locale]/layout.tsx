import { NextAuthProvider } from "@/components/auth/provider";
import ThemeProvider from "@/components/settings/ThemeProvider";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Quicksand } from "next/font/google";
import { notFound } from "next/navigation";

const quicksand = Quicksand({ subsets: ["latin"] });

export default async function RootLayout({ children, params: { locale } }: { session: any; children: React.ReactNode; params: Record<string, any> }) {
  let messages;
  try {
    messages = (await import(`@/locale/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head />
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
      <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
      <body className={quicksand.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider locale={locale}>
            <NextAuthProvider>{children}</NextAuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Nano influencer";
  const description = "Nano influencer platform";

  return {
    title,
    description,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      title,
      description,
      url: "https://nextjs.org",
      siteName: title,
      images: [
        {
          url: "https://nextjs.org/og.png",
          width: 800,
          height: 600,
        },
        {
          url: "https://nextjs.org/og-alt.png",
          width: 1800,
          height: 1600,
          alt: "My custom alt",
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
}
