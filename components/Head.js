import NextHead from "next/head";
import { useRouter } from "next/router";

const defaultTitle = "Sanitize Code - Anonymize JavaScript";
const baseUrl = "https://anonymizejs.com";

export const Head = ({ children, title = defaultTitle, description }) => {
  const router = useRouter();
  const url = `${baseUrl}${router.pathname === "/" ? "" : router.pathname}`;

  return (
    <NextHead>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      <meta
        name="keywords"
        content="anonymize,sanitize,javascript,code,babel-plugin-anonymize,rename,obfuscate"
      />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      {description ? (
        <meta property="og:description" content={description} />
      ) : null}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@rousselmm" />
      <meta name="twitter:creator" content="@rousselmm" />
      <meta name="twitter:title" content={title} />
      {description ? (
        <meta name="twitter:description" content={description} />
      ) : null}
      <meta name="twitter:image:alt" content={title} />

      <link rel="apple-touch-icon" href="/favicon-152.png" />

      <link rel="canonical" href={url} />

      {children}
    </NextHead>
  );
};
