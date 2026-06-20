const products = [
  {
    id: 'posture-pal',
    name: 'Posture Pal — Memory Foam Lumbar Cushion',
    slug: 'posture-pal',
    price: 29.99,
    originalPrice: 34.99,
    category: 'office',
    tagline: 'Your chair is destroying your back. Fix it for $30.',
    description: 'Back pain is not normal — your chair just isn\'t supporting you. Posture Pal is a memory foam lumbar cushion that fills the gap between your lower back and your chair. Use it at the office, in the car, or on the couch. Ergonomic design, breathable mesh cover, and a carry handle so you can take relief wherever you go.',
    features: [
      'Premium memory foam — molds to your spine',
      'Breathable mesh cover — no sweating',
      'Carry handle — take it anywhere',
      'Fits office chairs, cars, couches, gaming chairs',
      'Relieves lower back pressure instantly',
      '30-day money-back guarantee'
    ],
    image: '/images/posture-pal.png',
    rating: 4.6,
    reviewCount: 891,
    upsell: { name: 'Car Seat Extension Strap', price: 5.99 },
    crossSell: { name: 'Cable Tidy Kit — 20-Piece Desk Fix', price: 16.99 },
  },
];

export const trustBadges = [
  { icon: '🔒', label: 'Secure Checkout', desc: 'SSL encrypted' },
  { icon: '🚚', label: 'Free Shipping', desc: 'Over $49' },
  { icon: '💯', label: '30-Day Guarantee', desc: 'Money-back guarantee' },
  { icon: '⭐', label: 'Rated 4.6/5', desc: 'By 891 customers' },
  { icon: '📦', label: 'Ships in 24h', desc: 'Fast processing' },
];

export const faqs = [
  { q: 'How does Posture Pal help back pain?', a: 'Most chairs have a gap between your lower back and the seat. Posture Pal fills that gap with memory foam, keeping your spine in its natural S-curve. This reduces pressure on your discs and stops the slouching that causes back pain.' },
  { q: 'Will it fit my chair?', a: 'Yes — Posture Pal is designed to fit any chair: office chairs, car seats, couches, gaming chairs, and even airplane seats. The elastic straps secure it to any backrest.' },
  { q: 'How long does shipping take?', a: 'Orders are processed within 24 hours. Standard shipping takes 5-10 business days within the US. Express shipping (2-4 business days) is available at checkout.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day money-back guarantee. If Posture Pal doesn\'t relieve your back pain, contact us for a full refund — no questions asked.' },
  { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through Stripe, which uses bank-grade encryption. We never store your credit card details.' },
  { q: 'How do I get free shipping?', a: 'Orders over $49 ship free anywhere in the US. Add the Car Strap ($5.99) and Cable Tidy Kit ($16.99) to hit the threshold!' },
];

export default products;