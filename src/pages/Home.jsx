import { useState } from 'react';
import { useCart } from '../CartContext';
import product, { trustBadges, faqs } from '../data/products';

const p = product[0];
const STRIPE_LINK = 'https://buy.stripe.com/6oUbJ13doblS0RrdsY3Je00';

export default function Home() {
  const { addItem, cart, subtotal, freeShippingThreshold, freeShippingEarned, shippingProgress, setCartOpen } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleAddToCart = () => {
    addItem(p);
    setAddedToCart(true);
    setShowUpsell(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleAddUpsell = () => {
    addItem({ ...p, id: 'upsell-strap', name: 'Car Seat Extension Strap', price: 5.99, image: p.image });
    setShowUpsell(false);
  };

  const handleBuyNow = () => {
    window.open(STRIPE_LINK, '_blank');
  };

  const inCart = cart.some(item => item.id === p.id);

  return (
    <div>
      {/* Social Proof Bar */}
      <div className="bg-teal-600 text-white text-center py-2 text-xs sm:text-sm font-medium tracking-wide">
        <span>⭐ 4.6/5 from 891 buyers</span>
        <span className="mx-3">·</span>
        <span>🚚 Free shipping over $49</span>
        <span className="mx-3">·</span>
        <span>💯 30-day guarantee</span>
      </div>

      {/* HERO SECTION — Full product focus */}
      <section className="bg-gradient-to-b from-teal-50 via-white to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            
            {/* Left: Product Image */}
            <div className="order-2 md:order-1">
              <div className="relative">
                <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Badge */}
                <div className="absolute -top-3 -right-3 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                  ⚡ BEST SELLER
                </div>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="order-1 md:order-2">
              {/* Brand */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-teal-600 font-bold text-sm tracking-widest uppercase">Snap</span>
                <span className="text-gray-300">·</span>
                <span className="text-gray-500 text-sm">Problem Solved.</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                Your Chair Is Destroying Your Back.
                <span className="text-teal-600 block mt-2">Fix It for $30.</span>
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-5 h-5 ${i < Math.round(p.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 font-medium">{p.rating} · {p.reviewCount.toLocaleString()} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-extrabold text-gray-900">${p.price}</span>
                {p.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">${p.originalPrice}</span>
                )}
                <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">Save 14%</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {p.description}
              </p>

              {/* Feature bullets */}
              <ul className="space-y-2 mb-8">
                {p.features.slice(0, 4).map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-teal-500 mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Add to Cart / Buy Now */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all active:scale-95 ${
                    addedToCart
                      ? 'bg-green-500 text-white'
                      : 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart!' : inCart ? 'Add Another' : 'Add to Cart — $29.99'}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-4 px-8 rounded-xl font-bold text-lg border-2 border-teal-600 text-teal-600 hover:bg-teal-50 transition-all"
                >
                  Buy Now
                </button>
              </div>

              {/* Payment icons */}
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span>🔒 Secure checkout</span>
                <span>·</span>
                <span>Visa</span>
                <span>MC</span>
                <span>Amex</span>
                <span>Apple Pay</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UPSELL MODAL (after add-to-cart) */}
      {showUpsell && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Most customers also add...</h3>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-2xl">🔗</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">Car Seat Extension Strap</p>
                <p className="text-sm text-gray-500">Keeps Posture Pal secure in your car</p>
                <p className="text-teal-600 font-bold mt-1">+$5.99</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={handleAddUpsell} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-xl transition-all">
                Yes, Add It
              </button>
              <button onClick={() => setShowUpsell(false)} className="flex-1 border border-gray-300 text-gray-700 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 transition-all">
                No Thanks
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FREE SHIPPING BAR */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-teal-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2 text-sm">
              <span className="font-medium text-teal-800">
                {freeShippingEarned ? '🎉 You\'ve earned free shipping!' : `🚚 Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping`}
              </span>
              <span className="text-teal-600 font-semibold">${freeShippingThreshold}</span>
            </div>
            <div className="h-2.5 bg-teal-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all duration-500" style={{ width: `${Math.min(shippingProgress, 100)}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {trustBadges.map((badge, i) => (
              <div key={i} className="text-center p-3">
                <span className="text-2xl block mb-1">{badge.icon}</span>
                <p className="font-semibold text-xs text-gray-900">{badge.label}</p>
                <p className="text-xs text-gray-400">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Why Posture Pal Works</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: '🪑', title: 'Fits Any Chair', desc: 'Office, car, couch, gaming — elastic straps secure it to any backrest.' },
              { icon: '🧠', title: 'Memory Foam', desc: 'Molds to your spine\'s natural curve. No more slouching.' },
              { icon: '🔄', title: 'Portable Relief', desc: 'Built-in carry handle. Take relief from desk to car to home.' },
              { icon: '🌬️', title: 'Breathable Mesh', desc: 'Stay cool all day. No sweating, no discomfort.' },
              { icon: '💪', title: 'Posture Fix', desc: 'Aligns your pelvis and spine. Reduces pressure on discs.' },
              { icon: '✅', title: '30-Day Guarantee', desc: 'If your back doesn\'t feel better, we refund you. No questions.' },
            ].map((feat, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                <span className="text-3xl block mb-3">{feat.icon}</span>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{feat.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">Real Backs, Real Results</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'David K.', text: 'I sit 10 hours a day for work. Lower back pain was killing me. After 3 days with Posture Pal, the pain is basically gone. Unreal.', stars: 5 },
              { name: 'Rachel M.', text: 'Bought this for my WFH setup. I can actually feel my posture improving. My husband stole it for his car — ordering another one.', stars: 5 },
              { name: 'Tom S.', text: 'Truck driver here. 12-hour shifts were destroying my back. This cushion is the best $30 I\'ve ever spent. Period.', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl">
                <div className="flex text-amber-400 mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">"{t.text}"</p>
                <p className="mt-3 font-semibold text-sm text-gray-900">— {t.name}</p>
                <p className="text-xs text-gray-400">Verified buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Questions? We've Got Answers</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <svg className={`w-5 h-5 text-gray-400 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeFaq === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Stop Living with Back Pain</h2>
          <p className="text-teal-100 text-lg mb-2">30-day money-back guarantee. Ships within 24 hours.</p>
          <p className="text-teal-200 text-sm mb-8">Free shipping on orders over $49</p>
          <button
            onClick={handleAddToCart}
            className="bg-white text-teal-700 font-bold text-lg py-4 px-12 rounded-xl hover:bg-teal-50 transition-all shadow-xl inline-flex items-center gap-2"
          >
            Add to Cart — $29.99
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </section>
    </div>
  );
}