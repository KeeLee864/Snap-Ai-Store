import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

const STRIPE_LINK = 'https://buy.stripe.com/6oUbJ13doblS0RrdsY3Je00';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, freeShippingEarned, clearCart } = useCart();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handlePay = () => {
    if (!email || !name || !agreed) return;
    setProcessing(true);
    // Store the email for order follow-up
    try {
      localStorage.setItem('snap-checkout-email', email);
      localStorage.setItem('snap-checkout-name', name);
    } catch {}
    // Open Stripe checkout in same tab
    window.location.href = STRIPE_LINK;
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-6">Add Posture Pal to your cart to checkout.</p>
        <button onClick={() => navigate('/')} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all">
          Shop Now
        </button>
      </div>
    );
  }

  const itemCount = cart.reduce((s, i) => s + i.quantity, 0);
  const total = subtotal;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Snap-branded header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-bold text-lg text-gray-900">Snap</span>
          </div>
          <span className="text-sm text-gray-400">Secure checkout</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-5 gap-8">
          
          {/* Left: Customer Info */}
          <div className="md:col-span-3">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>

            {/* Trust reminders */}
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 mb-6 flex items-center gap-3 text-sm">
              <span className="text-xl">🔒</span>
              <span className="text-teal-800 font-medium">Your payment is secured by Stripe. We never see your card details.</span>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
              <h2 className="font-bold text-gray-900 mb-4">Contact</h2>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 mb-4">
              <h2 className="font-bold text-gray-900 mb-4">Delivery</h2>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <p className="text-xs text-gray-400 mt-2">Shipping address will be collected by Stripe at payment.</p>
            </div>

            {/* Payment Button */}
            <div className="bg-white rounded-xl border border-gray-100 p-6">
              <h2 className="font-bold text-gray-900 mb-4">Payment</h2>
              
              {/* Payment method badges */}
              <div className="flex gap-2 mb-6">
                {['Visa', 'MC', 'Amex', 'Discover', 'Apple Pay', 'Google Pay'].map(pm => (
                  <span key={pm} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-md">{pm}</span>
                ))}
              </div>

              <label className="flex items-start gap-3 mb-6">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-sm text-gray-500">
                  I agree to the <a href="#" className="text-teal-600 underline">terms & conditions</a> and <a href="#" className="text-teal-600 underline">privacy policy</a>
                </span>
              </label>

              <button
                onClick={handlePay}
                disabled={!email || !name || !agreed || processing}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  processing
                    ? 'bg-gray-300 text-gray-500 cursor-wait'
                    : email && name && agreed
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-200 active:scale-[0.98]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {processing ? 'Redirecting to payment...' : `Pay $${total.toFixed(2)}`}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                🔒 SSL encrypted • Powered by Stripe
              </p>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 p-6 sticky top-24">
              <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({itemCount} item{itemCount > 1 ? 's' : ''})</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-medium ${freeShippingEarned ? 'text-green-600' : 'text-gray-500'}`}>
                    {freeShippingEarned ? 'FREE 🎉' : 'Calculated at payment'}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-base">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-xl text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="mt-6 space-y-2 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>SSL encrypted checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🚚</span>
                  <span>Free shipping over $49</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💯</span>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}