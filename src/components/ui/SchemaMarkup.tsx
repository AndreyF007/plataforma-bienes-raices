export default function SchemaMarkup({
  tenantName,
  domain,
  settings,
}: {
  tenantName: string;
  domain: string;
  settings: any;
}) {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const baseUrl = `${protocol}://${domain}`;

  const image = settings.aboutImage || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1920&q=80";

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${baseUrl}/#organization`,
        "name": tenantName,
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "url": image,
          "width": 512,
          "height": 512
        },
        "image": image,
        "description": settings.heroText || `Especialista en bienes raíces de lujo. ${tenantName} le ayuda a comprar y vender propiedades exclusivas.`,
        "telephone": settings.contactPhone || "+506 6041 3905",
        "email": settings.contactEmail || "info@example.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": settings.officeAddress || "Costa Rica",
          "addressCountry": "CR"
        },
        "priceRange": "$$$$"
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": tenantName,
        "publisher": {
          "@id": `${baseUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/portal?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
