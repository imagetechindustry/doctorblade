import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.doctorblade.co.in';
const SITE_NAME = 'ImageTech Industries';
const LOGO_URL = `${SITE_URL}/logo.png`;
const DEFAULT_IMAGE = LOGO_URL;
const TWITTER_HANDLE = '@ImageTech_Ind'; // Placeholder

/**
 * Central SEO/meta component. Renders standard meta tags, Open Graph,
 * Twitter Card tags, and any number of JSON-LD structured data blocks.
 *
 * `schema` accepts either a single schema object or an array of them
 */
export default function SEO({
  title,
  description,
  name = SITE_NAME,
  type = 'website',
  image = DEFAULT_IMAGE,
  keywords,
  schema,
  noindex = false,
}) {
  const location = useLocation();

  // Avoid duplicate brand suffix if title already contains site name or ImageTech
  const fullTitle = !title
    ? name
    : title === name || title.includes(name) || title.includes('ImageTech')
    ? title
    : `${title} | ${name}`;

  // Keep document.title immediately in sync
  React.useEffect(() => {
    if (fullTitle) {
      document.title = fullTitle;
    }
  }, [fullTitle]);

  // Format canonical URL: root gets trailing slash (matches sitemap & GSC), subpages don't
  const cleanPath = location.pathname.replace(/\/+$/, '');
  const currentUrl = cleanPath ? `${SITE_URL}${cleanPath}` : `${SITE_URL}/`;

  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];
  const keywordContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return (
    <Helmet>
      <html lang="en-IN" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywordContent && <meta name="keywords" content={keywordContent} />}
      <meta name="author" content="ImageTech Industries" />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={currentUrl} />
      <link rel="icon" type="image/png" href="/logo.png" />
      <link rel="shortcut icon" type="image/png" href="/logo.png" />
      <link rel="apple-touch-icon" href="/logo.png" />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:logo" content={LOGO_URL} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={name} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={currentUrl} />

      {/* Structured data — one <script> per schema object */}
      {schemaList.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * Lightweight component to inject structured data (JSON-LD) without modifying other meta tags.
 * Useful for deep components (like FAQs) that need to append schema to the page.
 */
export function SchemaInjector({ schema }) {
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];
  if (schemaList.length === 0) return null;

  return (
    <Helmet>
      {schemaList.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}
    </Helmet>
  );
}
