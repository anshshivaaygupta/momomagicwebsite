import React from 'react';

export const StructuredData: React.FC = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Momos Magic',
    image: 'https://www.momomegics.com/images/logo.png',
    '@id': 'https://www.momomegics.com',
    url: 'https://www.momomegics.com',
    telephone: '+919955955191',
    priceRange: '₹40-₹85',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Naya Bazar, Near Post Office',
      addressLocality: 'Sherghati',
      addressRegion: 'Bihar',
      postalCode: '824211',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.5667,
      longitude: 84.7833,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '22:00',
    },
    servesCuisine: 'Momos, Street Food',
    acceptsReservations: 'False',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '2000',
    },
    founder: {
      '@type': 'Person',
      name: 'Dhruv Gupta',
    },
    award: 'Best Quality Food in City - District Magistrate Award 2024',
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Momos Magic',
    image: 'https://www.momomegics.com/images/logo.png',
    '@id': 'https://www.momomegics.com',
    url: 'https://www.momomegics.com',
    telephone: '+919955955191',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Naya Bazar, Near Post Office',
      addressLocality: 'Sherghati',
      addressRegion: 'Bihar',
      postalCode: '824211',
      addressCountry: 'IN',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '10:00',
      closes: '22:00',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
};
