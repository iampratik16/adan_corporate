import type { Metadata, Viewport } from 'next';
import { site } from '@content/site';
import { fontVariables } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { RevealObserver } from '@/components/shared/RevealObserver';
import { SmoothScroll } from '@/components/shared/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    url: site.url,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F7F8' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1D33' },
  ],
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organisation = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    foundingDate: String(site.founded),
    description: site.description,
    sameAs: [site.social.linkedin],
    email: site.mailboxes.partners.address,
  };

  return (
    <html lang="en-GB" className={fontVariables}>
      <body>
        <a href="#main" className="skip-link focus:skip-link-focus">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <SmoothScroll />
        <script
          type="application/ld+json"
          // Static, build-time JSON from typed content. No user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisation) }}
        />
      </body>
    </html>
  );
}
