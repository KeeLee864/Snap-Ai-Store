import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeItem, updateQuantity, subtotal, freeShippingThreshold, freeShippingEarned, shippingProgress } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-500 mt-2">Add BackHarmony to get started!</p>
        <Link to="/" className="mt-6 inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-xl transition-all">
          Add BackHarmony
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {/* Free shipping bar */}
      <div className="bg-teal-50 rounded-xl p-4 mb-8 border border-teal-100">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="font-medium text-teal-800">
            {freeShippingEarned ? '🎉 Free shipping unlocked!' : `🚚 Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping`}
          </span>
          <span className="text-teal-600 font-semibold">$49</span>
        </div>
        <div className="h-2.5 bg-teal-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-teal-400 to-teal-500 rounded-full transition-all" style={{ width: `${Math.min(shippingProgress, 100)}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex gap-4">
              <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                <p className="text-lg font-bold text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                {item.upsell && (
                  <p className="text-xs text-teal-600 font-medium">+ {item.upsell.name}</p>
                )}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 text-sm">−</button>
                    <span className="px-4 py-1.5 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-gray-500 hover:bg-gray-50 text-sm">+</button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-sm text-red-400 hover:text-red-600">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 h-fit sticky top-20">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-green-600">{freeShippingEarned ? 'FREE 🎉' : 'Calculated at checkout'}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-xl">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/checkout')}
            className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-8 rounded-xl transition-all mt-6"
          >
            Proceed to Checkout
          </button>
          <Link to="/" className="block text-center text-sm text-gray-500 hover:text-teal-600 mt-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}