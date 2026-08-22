import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://lucente-milano.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/hero-dish.jpg`;

/**
 * SEOHead - Dynamic SEO, GEO, AEO & JSON-LD Structured Data Manager
 * Handles Title, Canonical, OpenGraph, Twitter Cards, Geo Tags, and Schema.org graphs
 */
export default function SEOHead({
  title = 'LUCENTE | Alta Cucina Contemporanea — Milano',
  description = "Restaurant gastronomique d'exception à Milan. Deux étoiles Michelin. Haute cuisine italienne contemporaine guidée par le Chef Vincenzo Moretti au cœur du Quadrilatero della Moda.",
  image = DEFAULT_IMAGE,
  type = 'website',
  path = '',
  article = null,
  schema = null
}) {
  const location = useLocation();
  const currentPath = path || location.pathname;
  const canonicalUrl = `${BASE_URL}${currentPath === '/' ? '' : currentPath}`;
  const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to update or create a meta tag
    const setMetaTag = (attributeName, attributeValue, contentValue) => {
      let meta = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attributeName, attributeValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', contentValue);
    };

    // Helper function to update or create a link tag
    const setLinkTag = (rel, href) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    // 2. Standard SEO Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    setLinkTag('canonical', canonicalUrl);

    // 3. GEO Localization Meta Tags (Milan / Quadrilatero della Moda)
    setMetaTag('name', 'geo.region', 'IT-25'); // Lombardia / Milano
    setMetaTag('name', 'geo.placename', 'Milano');
    setMetaTag('name', 'geo.position', '45.468722;9.194711');
    setMetaTag('name', 'ICBM', '45.468722, 9.194711');

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', fullImageUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', 'LUCENTE Milano');
    setMetaTag('property', 'og:locale', 'fr_FR');
    setMetaTag('property', 'og:locale:alternate', 'it_IT');
    setMetaTag('property', 'og:locale:alternate', 'en_US');

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', fullImageUrl);
    setMetaTag('name', 'twitter:site', '@LucenteMilano');

    // 6. Article Meta Tags if applicable
    if (article) {
      if (article.datePublished) {
        setMetaTag('property', 'article:published_time', article.datePublished);
      }
      if (article.author) {
        setMetaTag('property', 'article:author', article.author);
      }
      if (article.section) {
        setMetaTag('property', 'article:section', article.section);
      }
    }

    // 7. Inject Structured Data (Schema.org JSON-LD)
    const scriptId = 'lucente-dynamic-json-ld';
    let scriptTag = document.getElementById(scriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    // Default master organization/restaurant schema
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['Restaurant', 'LocalBusiness'],
          '@id': `${BASE_URL}/#restaurant`,
          'name': 'LUCENTE',
          'legalName': 'LUCENTE Alta Cucina S.r.l.',
          'url': BASE_URL,
          'logo': `${BASE_URL}/images/hero-dish.jpg`,
          'image': [
            `${BASE_URL}/images/hero-dish.jpg`,
            `${BASE_URL}/images/dining-room.jpg`,
            `${BASE_URL}/images/chef-craft.jpg`
          ],
          'description': "Restaurant gastronomique italien doublement étoilé au Guide Michelin. Haute cuisine contemporaine au clair-obscur dirigée par le Chef Vincenzo Moretti à Milan.",
          'servesCuisine': ['Haute Cuisine Italienne', 'Contemporary Italian', 'Alta Cucina'],
          'priceRange': '€€€€€',
          'currenciesAccepted': 'EUR',
          'paymentAccepted': 'Cash, Credit Card, Apple Pay',
          'award': ['2 Étoiles Michelin 2026', '3 Fourchettes Gambero Rosso 2025'],
          'telephone': '+39 02 8945 7700',
          'email': 'conciergerie@lucente-milano.com',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Via Monte Napoleone, 14',
            'addressLocality': 'Milano',
            'addressRegion': 'MI',
            'postalCode': '20121',
            'addressCountry': 'IT'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 45.468722,
            'longitude': 9.194711
          },
          'hasMap': 'https://maps.google.com/?q=Via+Monte+Napoleone+14+Milano',
          'openingHoursSpecification': [
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              'opens': '12:30',
              'closes': '15:00'
            },
            {
              '@type': 'OpeningHoursSpecification',
              'dayOfWeek': ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              'opens': '19:30',
              'closes': '23:30'
            }
          ],
          'acceptsReservations': 'True',
          'potentialAction': {
            '@type': 'ReserveAction',
            'target': {
              '@type': 'EntryPoint',
              'urlTemplate': `${BASE_URL}/reservations`,
              'inLanguage': 'fr-FR',
              'actionPlatform': [
                'http://schema.org/DesktopWebPlatform',
                'http://schema.org/MobileWebPlatform'
              ]
            },
            'result': {
              '@type': 'FoodEstablishmentReservation',
              'name': 'Table à LUCENTE Milano'
            }
          },
          'founder': {
            '@type': 'Person',
            'name': 'Vincenzo Moretti',
            'jobTitle': 'Chef Exécutif & Propriétaire'
          },
          'employee': [
            {
              '@type': 'Person',
              'name': 'Gianluca Ferri',
              'jobTitle': 'Directeur de la Sommellerie'
            },
            {
              '@type': 'Person',
              'name': 'Matteo Castiglione',
              'jobTitle': 'Maître d\'Hôtel'
            }
          ]
        }
      ]
    };

    // If specific schema provided, merge or use it
    if (schema) {
      if (schema['@graph']) {
        scriptTag.text = JSON.stringify(schema, null, 2);
      } else {
        scriptTag.text = JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            ...defaultSchema['@graph'],
            schema
          ]
        }, null, 2);
      }
    } else {
      scriptTag.text = JSON.stringify(defaultSchema, null, 2);
    }

  }, [title, description, canonicalUrl, fullImageUrl, type, article, schema]);

  return null;
}
