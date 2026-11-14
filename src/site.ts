export const siteInfo = {
  name: 'Guanchen',
  url: 'https://guanchen.nl',
  language: 'en',
  description:
    'Guanchen - technology consulting for resilient systems across cloud, APIs, integration, observability, and operations.',
  feed: {
    title: 'Guanchen Articles',
    subtitle: 'Short articles from Guanchen.',
    path: '/atom.xml',
    articlesPath: '/articles/',
  },
  author: {
    name: 'Erwin Kramer',
    email: 'info@guanchen.nl',
    linkedinUrl: 'https://www.linkedin.com/in/kramererwin/',
    linkedinLabel: 'linkedin/kramererwin',
    githubUrl: 'https://github.com/erwinkramer',
    githubContactUrl: 'https://github.com/erwinkramer#-hi-there',
    githubLabel: 'github/erwinkramer',
  },
  business: {
    legalForm: 'sole proprietorship',
    pronunciation: 'GWAN-chay',
    nameOrigin: 'the Guanches, pre-Hispanic island people of the Canaries',
    kvkUrl: 'https://www.kvk.nl/bestellen/#/88833801000054661021/',
    kvkLabel: 'KvK 88833801',
    vat: 'VAT NL003007917B65',
  },
  knowsAbout: ['Cloud consulting', 'API design', 'Integration architecture', 'Observability', 'Open source'],
};

export const siteStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteInfo.name,
    url: siteInfo.url,
    description: siteInfo.description,
    inLanguage: siteInfo.language,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteInfo.name,
    url: siteInfo.url,
    description: siteInfo.description,
    email: siteInfo.author.email,
    founder: {
      '@type': 'Person',
      name: siteInfo.author.name,
      url: siteInfo.author.linkedinUrl,
      sameAs: [siteInfo.author.githubUrl, siteInfo.author.linkedinUrl],
    },
    knowsAbout: siteInfo.knowsAbout,
  },
];