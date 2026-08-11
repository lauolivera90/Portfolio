export const projects = [
  {
    id: 'meridian',
    title: 'Meridian — Project Management SaaS',
    shortDescription: 'Multi-tenant platform serving 12k+ teams.',
    fullDescription:
      'Multi-tenant platform serving 12k+ teams. Real-time collaboration engine, custom billing with Stripe, and a zero-downtime migration pipeline for schema evolution.',
    stack: {
      frontend: ['Next.js', 'TypeScript'],
      backend: [],
      database: ['PostgreSQL', 'Redis'],
      tools: ['Stripe', 'Kubernetes'],
    },
    demoUrl: '#',
    repoUrl: '#',
    images: [
      'https://picsum.photos/800/450?seed=meridian',
      'https://picsum.photos/800/450?seed=meridian&grayscale',
      'https://picsum.photos/800/450?seed=meridian&blur=1',
    ],
  },
  {
    id: 'cascade',
    title: 'Cascade — Analytics Pipeline',
    shortDescription: 'Event-streaming pipeline processing 40M+ events per day.',
    fullDescription:
      'Event-streaming pipeline processing 40M+ events per day. Reduced P95 query latency from 4.2 s to 180 ms via columnar redesign and materialized-view strategy.',
    stack: {
      frontend: [],
      backend: ['Python', 'Kafka', 'Airflow'],
      database: ['ClickHouse'],
      tools: ['Docker', 'Terraform'],
    },
    demoUrl: '#',
    repoUrl: '#',
    images: [
      'https://picsum.photos/800/450?seed=cascade',
      'https://picsum.photos/800/450?seed=cascade&grayscale',
      'https://picsum.photos/800/450?seed=cascade&blur=1',
    ],
  },
]