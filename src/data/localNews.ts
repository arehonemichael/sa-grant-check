import type { NewsFeed } from '../types';

export const bundledNewsFeed: NewsFeed = {
  version: 1,
  updatedAt: '2026-08-26T12:00:00+02:00',
  articles: [
    {
      id: 'safe-status-check',
      title: 'How to check your SRD status safely',
      date: '2026-08-26',
      excerpt: 'Use the official status page and keep your personal grant details away from unofficial forms.',
      imageLabel: 'Safe status checks',
      sourceName: 'SASSA SRD website',
      sourceUrl: 'https://srd.sassa.gov.za/',
      body: [
        'Use the Check SRD Status button in this app to open the official SASSA SRD status page.',
        'Only enter your ID number and the cellphone number used for your application on the official SASSA website. This app never asks for or stores those details.',
        'Be careful with links sent through social media. Never share banking PINs, passwords or one-time passwords with people claiming they can speed up a grant payment.'
      ]
    },
    {
      id: 'approved-no-date',
      title: 'Approved but no payment date: what it can mean',
      date: '2026-08-20',
      excerpt: 'Approval and payment scheduling can happen at different stages.',
      imageLabel: 'Payment scheduling',
      sourceName: 'SASSA SRD website',
      sourceUrl: 'https://srd.sassa.gov.za/',
      body: [
        'An approved result means the application passed the relevant checks for that period. It does not always mean a payment date has already been allocated.',
        'Check the official status page again later for the same period. Banking and payment-channel processing can also affect when funds become available.',
        'Do not pay anyone who says they can create or move a payment date for you.'
      ]
    },
    {
      id: 'pending-explained',
      title: 'What a pending SRD status means',
      date: '2026-08-12',
      excerpt: 'Pending generally means processing for that period has not yet produced a final result.',
      imageLabel: 'Pending explained',
      sourceName: 'SASSA SRD website',
      sourceUrl: 'https://srd.sassa.gov.za/',
      body: [
        'A pending result means the process for that period has not yet produced a final outcome.',
        'The safest next step is to check the official SASSA status page again later.',
        'This app cannot predict an approval result and cannot change an official status.'
      ]
    }
  ]
};
