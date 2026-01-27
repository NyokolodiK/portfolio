import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kagiso Nyokolodi',
    url: 'https://www.kagiso-nyokolodi.dev',
    image: 'https://www.kagiso-nyokolodi.dev/og-image.png',
    sameAs: [
      'https://www.linkedin.com/in/kagiso-nyokolodi/',
      'https://github.com/NyokolodiK',
      'https://twitter.com/kagiso_nyokolodi',
    ],
    jobTitle: 'Senior Software Engineer AI Enthusiast',
    worksFor: {
      '@type': 'Organization',
      name: 'NTT DATA, Inc.',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Meredale',
      addressRegion: 'Gauteng',
      addressCountry: 'South Africa',
    },
    alumniOf: {
      '@type': 'Organization',
      name: 'Tshwane University of Technology',
    },
    knowsAbout: [
      'Software Engineering',
      'Frontend Development',
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Web Development',
      'UI/UX Design',
      'Scalable Systems',
      'Team Leadership',
    ],
    description:
      'Results-driven Senior Software Engineer and AI enthusiast with expertise in building high-performance web applications. Specializing in React, Next.js, TypeScript, AI integration, and scalable system design.',
  }

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Kagiso Nyokolodi Portfolio',
    url: 'https://www.kagiso-nyokolodi.dev',
    description:
      'Professional portfolio of Kagiso Nyokolodi, a Senior Software Engineer and AI enthusiast specializing in frontend development, AI integration, and scalable systems.',
    author: {
      '@type': 'Person',
      name: 'Kagiso Nyokolodi',
    },
    inLanguage: 'en-US',
  }

  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Kagiso Nyokolodi - Software Engineering Services',
    url: 'https://www.kagiso-nyokolodi.dev',
    description:
      'Professional software engineering and frontend development services',
    provider: {
      '@type': 'Person',
      name: 'Kagiso Nyokolodi',
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Software Development',
      'Frontend Development',
      'Web Application Development',
      'Technical Consulting',
      'Team Leadership',
    ],
  }

  return (
    <>
      <Script
        id="structured-data-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <Script
        id="structured-data-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(professionalServiceData),
        }}
      />
    </>
  )
}
