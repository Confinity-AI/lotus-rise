import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import "@/resources/home-editorial.css";

import { Header, Providers } from "@/components";
import { SiteFooter } from "@/components/SiteFooter";
import { fonts } from "@/resources/once-ui.config";
import { getThemeInitScript } from "@/lib/themeInitScript";
import { baseURL, meta } from "@/resources/seo";
import { Meta, Schema } from "@once-ui-system/core";
import classNames from "classnames";

export async function generateMetadata() {
  return Meta.generate({
    title: meta.home.title,
    description: meta.home.description,
    baseURL: baseURL,
    path: meta.home.path,
    canonical: meta.home.canonical,
    image: meta.home.image,
    robots: meta.home.robots,
    alternates: meta.home.alternates,
  });
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{ __html: getThemeInitScript() }}
        />
      </head>
      <body style={{ margin: 0, background: "var(--neutral-background)" }}>
        <Schema
          as="webPage"
          baseURL={baseURL}
          title={meta.home.title}
          description={meta.home.description}
          path={meta.home.path}
        />
        <Providers>
          <Header />
          {children}
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
